/**
 * CredAlt -- Dashboard Logic
 * CIBIL-weighted scoring (300-900), reasoning engine, improvement tips, i18n
 */

const API_BASE = window.location.origin;
let currentRole = null;
let currentProfile = null;
let currentScore = null;
let selectedGoal = null;
let lastCibilBreakdown = null;
let lastProfileData = null;

// ── Initialization ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    currentRole = params.get('role') || 'custom';

    const info = ROLE_INFO[currentRole] || ROLE_INFO.custom;
    document.getElementById('userRoleLabel').textContent = info.name;
    document.getElementById('userAvatar').textContent = info.icon;

    // Build language selector
    buildLanguageSelector('langSwitcher');

    // Show custom tab if custom mode
    if (currentRole === 'custom') {
        document.getElementById('tabCustom').style.display = '';
        document.getElementById('profileBar').style.display = 'none';
        buildCustomForm();
        switchTab('custom');
    } else {
        populateProfileDropdown();
    }

    buildGoalSelector();

    // Listen for language changes to re-render dynamic content
    document.addEventListener('languageChanged', () => {
        if (lastCibilBreakdown && lastProfileData) {
            renderReasoning(currentScore, lastCibilBreakdown, lastProfileData);
        }
    });
});


// ── Profile Dropdown ──────────────────────────────────────────────────

function populateProfileDropdown() {
    const select = document.getElementById('profileSelect');
    const profiles = PROFILES[currentRole] || [];

    profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.icon} ${p.name} (Age ${p.age})`;
        select.appendChild(opt);
    });

    // Auto-select first profile
    if (profiles.length > 0) {
        select.value = profiles[0].id;
        onProfileChange();
    }
}

function onProfileChange() {
    const profileId = document.getElementById('profileSelect').value;
    const profiles = PROFILES[currentRole] || [];
    currentProfile = profiles.find(p => p.id === profileId);

    if (!currentProfile) return;

    document.getElementById('profileStory').textContent = currentProfile.story;
    scoreProfile(currentProfile.data);
}


// ══════════════════════════════════════════════════════════════════════
//  CIBIL SCORING ENGINE (300 - 900)
//  Weights: Payment History 30%, Credit Exposure 25%,
//           Credit Type & Duration 25%, New Credit/Inquiries 20%
// ══════════════════════════════════════════════════════════════════════

function calculateCIBILScore(data) {
    // ── 1. Payment History (30%) ──────────────────────────────────────
    // Utility payment consistency + EMI/loan repayment track record
    const utilityRegularity = Math.min(1, data.UTILITY_REGULARITY || 0);      // 0-1
    const loanRepayment = Math.min(1, data.LOAN_REPAYMENT_HISTORY || 0);      // 0-1
    const billsPaid = Math.min(1, (data.UTILITY_BILLS_PAID || 0) / 12);       // normalize to 12 months
    const rentConsistency = data.RENT_PAYMENT > 0 ? 1 : 0;

    const paymentHistoryRaw = (
        utilityRegularity * 0.35 +
        loanRepayment * 0.35 +
        billsPaid * 0.15 +
        rentConsistency * 0.15
    );
    const paymentHistoryScore = Math.round(paymentHistoryRaw * 100);

    // ── 2. Credit Exposure / Utilization (25%) ────────────────────────
    // Penalize if credit utilization > 30% of limit
    const income = data.INCOME || 1;
    const creditLimit = income * 3; // estimated credit limit = 3x income
    const monthlySpend = (data.UPI_AVG_AMOUNT || 0) * (data.UPI_TRANSACTIONS || 0) / 30;
    const utilization = Math.min(1, monthlySpend / creditLimit);

    let creditExposureRaw;
    if (utilization <= 0.1) {
        creditExposureRaw = 1.0; // excellent low usage
    } else if (utilization <= 0.3) {
        creditExposureRaw = 0.9 - (utilization - 0.1) * 0.5; // good, 0.9 -> 0.8
    } else if (utilization <= 0.5) {
        creditExposureRaw = 0.7 - (utilization - 0.3) * 1.5; // penalize, 0.7 -> 0.4
    } else if (utilization <= 0.75) {
        creditExposureRaw = 0.4 - (utilization - 0.5) * 1.0; // harsh, 0.4 -> 0.15
    } else {
        creditExposureRaw = Math.max(0.05, 0.15 - (utilization - 0.75) * 0.4);
    }

    // Savings buffer bonus
    const savingsRatio = Math.min(1, (data.SAVINGS_BALANCE || 0) / (income * 6));
    creditExposureRaw = creditExposureRaw * 0.7 + savingsRatio * 0.3;
    const creditExposureScore = Math.round(Math.min(1, creditExposureRaw) * 100);

    // ── 3. Credit Type & Duration (25%) ───────────────────────────────
    // Reward diverse financial products, stable employment, long bank age
    const financialProducts = Math.min(1, (data.NUM_FINANCIAL_PRODUCTS || 0) / 5);
    const hasInsurance = data.INSURANCE_STATUS || 0;
    const employmentStability = Math.min(1, data.EMPLOYMENT_STABILITY || 0);
    const bankAge = Math.min(1, (data.BANK_ACCOUNT_AGE || 0) / 10);

    const creditTypeRaw = (
        financialProducts * 0.3 +
        hasInsurance * 0.15 +
        employmentStability * 0.3 +
        bankAge * 0.25
    );
    const creditTypeScore = Math.round(creditTypeRaw * 100);

    // ── 4. New Credit / Inquiries (20%) ───────────────────────────────
    // Penalize frequent recent loan applications
    // Using e-commerce activity + frequent mobile recharges as proxy for inquiry behavior
    const rechargeFreq = Math.min(1, (data.MOBILE_RECHARGE_FREQ || 0) / 10);
    const ecomActivity = Math.min(1, (data.E_COMMERCE_ACTIVITY || 0) / 30);
    // Low digital footprint hints fewer applications
    const digitalActivity = Math.min(1, (data.DIGITAL_FOOTPRINT || 0) / 100);

    // Higher activity = more likely to have made inquiries (simulated)
    const inquiryActivityProxy = (rechargeFreq * 0.3 + ecomActivity * 0.4 + digitalActivity * 0.3);
    // Moderate activity is ideal; too high suggests frequent inquiries
    let inquiryRaw;
    if (inquiryActivityProxy <= 0.4) {
        inquiryRaw = 0.6 + inquiryActivityProxy * 0.5; // low activity: decent, 0.6 -> 0.8
    } else if (inquiryActivityProxy <= 0.7) {
        inquiryRaw = 0.85; // moderate: optimal
    } else {
        inquiryRaw = 0.85 - (inquiryActivityProxy - 0.7) * 1.5; // too frequent: penalize
    }
    inquiryRaw = Math.max(0.1, Math.min(1, inquiryRaw));

    // Peer lending and community support boost
    const peerScore = Math.min(1, (data.PEER_LENDING_SCORE || 0));
    inquiryRaw = inquiryRaw * 0.8 + peerScore * 0.2;
    const inquiryScore = Math.round(Math.min(1, inquiryRaw) * 100);

    // ── Final Weighted Score ──────────────────────────────────────────
    const weightedSum = (
        (paymentHistoryScore / 100) * 0.30 +
        (creditExposureScore / 100) * 0.25 +
        (creditTypeScore / 100) * 0.25 +
        (inquiryScore / 100) * 0.20
    );

    // Map to 300-900 range
    const finalScore = Math.round(300 + weightedSum * 600);
    const clampedScore = Math.max(300, Math.min(900, finalScore));

    return {
        score: clampedScore,
        breakdown: {
            paymentHistory: paymentHistoryScore,
            creditExposure: creditExposureScore,
            creditType: creditTypeScore,
            inquiries: inquiryScore,
        },
        utilizationPct: Math.round(utilization * 100),
        paymentPct: paymentHistoryScore
    };
}


// ── API + Scoring Pipeline ────────────────────────────────────────────

async function scoreProfile(data) {
    showLoader(true);
    lastProfileData = data;

    // Always calculate CIBIL score locally for the reasoning engine
    const cibilResult = calculateCIBILScore(data);
    lastCibilBreakdown = cibilResult;
    currentScore = cibilResult.score;

    try {
        const resp = await fetch(`${API_BASE}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await resp.json();
        if (result.error) throw new Error(result.error);

        // Use CIBIL-weighted local score instead of raw model probability
        result.credit_score = cibilResult.score;
        result.risk_category = getRiskCategory(cibilResult.score);

        renderScore(result);
        renderFactors(result.contributing_factors);
        renderRadar(result.contributing_factors);
        renderComparison({
            ...result.cibil_comparison,
            credalt_score: cibilResult.score,
            credalt_status: cibilResult.score >= 500 ? 'Approved' : 'Review Required'
        });
        updateQuickStats(data);
        renderReasoning(cibilResult.score, cibilResult, data);

        // Update goal planner defaults
        document.getElementById('goalSavings').value = data.SAVINGS_BALANCE || 10000;
    } catch (err) {
        console.error('Score error:', err);
        // Full fallback with local scoring
        fallbackScore(data, cibilResult);
    }
    showLoader(false);
}

function getRiskCategory(score) {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
}

function fallbackScore(data, cibilResult) {
    const score = cibilResult.score;
    const risk = getRiskCategory(score);

    const factors = [
        { category: 'Payment Behavior', score: cibilResult.breakdown.paymentHistory, features: [] },
        { category: 'Financial Health', score: cibilResult.breakdown.creditExposure, features: [] },
        { category: 'Credit Mix', score: cibilResult.breakdown.creditType, features: [] },
        { category: 'Inquiry Impact', score: cibilResult.breakdown.inquiries, features: [] },
        { category: 'Utility & Rent', score: Math.min(100, Math.round((data.UTILITY_REGULARITY || 0) * 80 + (data.UTILITY_BILLS_PAID || 0) * 5)), features: [] },
        { category: 'Digital Presence', score: Math.min(100, Math.round((data.DIGITAL_FOOTPRINT || 0) * 0.8 + (data.APP_USAGE_HOURS || 0) * 3)), features: [] },
    ];

    currentScore = score;
    renderScore({ credit_score: score, risk_category: risk, contributing_factors: factors });
    renderFactors(factors);
    renderRadar(factors);

    const cibilScoreDisplay = data.LOAN_REPAYMENT_HISTORY > 0.3
        ? Math.max(300, Math.round(score * 0.6 + (Math.random() * 50 - 25)))
        : 'NH';

    renderComparison({
        cibil_score: cibilScoreDisplay,
        cibil_status: typeof cibilScoreDisplay === 'number' ? (cibilScoreDisplay < 600 ? 'Rejected' : 'Marginal') : 'No History',
        credalt_score: score,
        credalt_status: score >= 500 ? 'Approved' : 'Review Required'
    });
    updateQuickStats(data);
    renderReasoning(score, cibilResult, data);
}


// ══════════════════════════════════════════════════════════════════════
//  DYNAMIC REASONING ENGINE
// ══════════════════════════════════════════════════════════════════════

function renderReasoning(score, cibilResult, data) {
    const section = document.getElementById('reasoningSection');
    section.style.display = 'block';

    const { breakdown, utilizationPct, paymentPct } = cibilResult;

    // ── Reasoning Text ────────────────────────────────────────────────
    const reasoningBody = document.getElementById('reasoningBody');
    const reasoningIcon = document.getElementById('reasoningIcon');

    let reasonKey, iconText, accentClass;
    if (score >= 750) {
        reasonKey = 'excellentReason';
        iconText = '\u{1F31F}'; // star
        accentClass = 'reasoning-excellent';
    } else if (score >= 650) {
        reasonKey = 'goodReason';
        iconText = '\u{1F44D}'; // thumbs up
        accentClass = 'reasoning-good';
    } else if (score >= 550) {
        reasonKey = 'fairReason';
        iconText = '\u26A0\uFE0F'; // warning
        accentClass = 'reasoning-fair';
    } else {
        reasonKey = 'poorReason';
        iconText = '\u{1F6A8}'; // alert
        accentClass = 'reasoning-poor';
    }

    reasoningIcon.textContent = iconText;
    const reasonText = t(reasonKey, {
        paymentPct: paymentPct,
        utilizationPct: utilizationPct
    });

    reasoningBody.innerHTML = `<p class="${accentClass}">${reasonText}</p>`;

    // ── CIBIL Weight Breakdown Bars ───────────────────────────────────
    animateWeightBar('weightPayment', breakdown.paymentHistory, getBarColor(breakdown.paymentHistory));
    document.getElementById('weightPaymentScore').textContent = `${breakdown.paymentHistory}/100`;

    animateWeightBar('weightExposure', breakdown.creditExposure, getBarColor(breakdown.creditExposure));
    document.getElementById('weightExposureScore').textContent = `${breakdown.creditExposure}/100`;

    animateWeightBar('weightType', breakdown.creditType, getBarColor(breakdown.creditType));
    document.getElementById('weightTypeScore').textContent = `${breakdown.creditType}/100`;

    animateWeightBar('weightInquiries', breakdown.inquiries, getBarColor(breakdown.inquiries));
    document.getElementById('weightInquiriesScore').textContent = `${breakdown.inquiries}/100`;

    // ── Improvement Checklist (score < 750) ───────────────────────────
    const improvementCard = document.getElementById('improvementCard');
    const improvementList = document.getElementById('improvementList');

    if (score < 750) {
        improvementCard.style.display = 'block';
        const tips = [];

        if (breakdown.paymentHistory < 80) {
            tips.push({
                key: 'tipPayOnTime',
                icon: '\u{1F4B3}', // credit card
                urgency: breakdown.paymentHistory < 50 ? 'high' : 'medium'
            });
        }
        if (breakdown.creditExposure < 70) {
            tips.push({
                key: 'tipLowerUtilization',
                icon: '\u{1F4C9}', // chart down
                urgency: breakdown.creditExposure < 40 ? 'high' : 'medium'
            });
        }
        if (breakdown.creditType < 60) {
            tips.push({
                key: 'tipDiversify',
                icon: '\u{1F4CA}', // bar chart
                urgency: breakdown.creditType < 30 ? 'high' : 'medium'
            });
        }
        if (breakdown.inquiries < 70) {
            tips.push({
                key: 'tipLimitInquiries',
                icon: '\u{1F50D}', // magnifier
                urgency: breakdown.inquiries < 40 ? 'high' : 'medium'
            });
        }

        // Always show at least the most impactful tips
        if (tips.length === 0) {
            tips.push({ key: 'tipPayOnTime', icon: '\u{1F4B3}', urgency: 'low' });
            tips.push({ key: 'tipLowerUtilization', icon: '\u{1F4C9}', urgency: 'low' });
        }

        improvementList.innerHTML = tips.map((tip, i) => `
            <div class="improvement-item ${tip.urgency}" style="animation-delay:${i * 0.1}s;">
                <span class="improvement-item-icon">${tip.icon}</span>
                <span class="improvement-item-text">${t(tip.key)}</span>
                <span class="improvement-urgency ${tip.urgency}">${tip.urgency === 'high' ? 'Urgent' : tip.urgency === 'medium' ? 'Important' : 'Recommended'}</span>
            </div>
        `).join('');
    } else {
        improvementCard.style.display = 'none';
    }
}

function animateWeightBar(id, value, color) {
    const bar = document.getElementById(id);
    bar.style.background = color;
    setTimeout(() => { bar.style.width = `${value}%`; }, 100);
}

function getBarColor(value) {
    if (value >= 75) return 'linear-gradient(90deg, #60f0a0, #40d080)';
    if (value >= 50) return 'linear-gradient(90deg, #c8f060, #a0d040)';
    if (value >= 30) return 'linear-gradient(90deg, #f0c060, #d0a040)';
    return 'linear-gradient(90deg, #f06060, #d04040)';
}


// ── Render Score ──────────────────────────────────────────────────────

function renderScore(result) {
    const { credit_score, risk_category } = result;

    // Animate number
    const numEl = document.getElementById('scoreNumber');
    animateNumber(numEl, credit_score);

    // Ring fill
    const ring = document.getElementById('scoreRingFill');
    const circumference = 2 * Math.PI * 90;
    const pct = (credit_score - 300) / 600;
    ring.style.strokeDasharray = circumference;
    setTimeout(() => {
        ring.style.strokeDashoffset = circumference * (1 - pct);
    }, 100);

    // Update gradient color based on score
    const gradient = document.querySelector('#scoreGradient');
    if (credit_score >= 750) {
        gradient.innerHTML = '<stop offset="0%" style="stop-color:#60f0a0"/><stop offset="100%" style="stop-color:#40d080"/>';
    } else if (credit_score >= 650) {
        gradient.innerHTML = '<stop offset="0%" style="stop-color:#c8f060"/><stop offset="100%" style="stop-color:#60f0a0"/>';
    } else if (credit_score >= 550) {
        gradient.innerHTML = '<stop offset="0%" style="stop-color:#f0c060"/><stop offset="100%" style="stop-color:#c8f060"/>';
    } else {
        gradient.innerHTML = '<stop offset="0%" style="stop-color:#f06060"/><stop offset="100%" style="stop-color:#f0c060"/>';
    }

    // Risk badge
    const badge = document.getElementById('riskBadge');
    badge.textContent = risk_category;
    badge.className = `badge badge-${risk_category.toLowerCase()}`;
}

function animateNumber(el, target) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
    }, 30);
}


// ── Quick Stats ───────────────────────────────────────────────────────

function updateQuickStats(data) {
    document.getElementById('statIncome').textContent = `\u20B9${(data.INCOME || 0).toLocaleString()}`;
    document.getElementById('statSavings').textContent = `\u20B9${(data.SAVINGS_BALANCE || 0).toLocaleString()}`;
    document.getElementById('statUPI').textContent = data.UPI_TRANSACTIONS || 0;
    document.getElementById('statUtility').textContent = `${Math.round((data.UTILITY_REGULARITY || 0) * 100)}%`;
}


// ── CIBIL Comparison ──────────────────────────────────────────────────

function renderComparison(comp) {
    document.getElementById('cibilScore').textContent = comp.cibil_score;
    document.getElementById('cibilStatus').textContent = comp.cibil_status;
    document.getElementById('credaltScore').textContent = comp.credalt_score;
    document.getElementById('credaltStatus').textContent = comp.credalt_status;
}


// ── Factor Breakdown ──────────────────────────────────────────────────

function renderFactors(factors) {
    const container = document.getElementById('factorList');
    const colors = ['#c8f060', '#60f0a0', '#f0c060', '#60c8f0', '#f06060', '#a78bfa'];

    container.innerHTML = factors.map((f, i) => `
        <div class="factor-item animate-in" style="animation-delay:${i * 0.1}s;">
            <div class="factor-header">
                <span class="factor-name">${f.category}</span>
                <span class="factor-score" style="color:${colors[i % colors.length]}">${f.score}/100</span>
            </div>
            <div class="factor-bar">
                <div class="factor-bar-fill" style="width:${f.score}%; background:${colors[i % colors.length]}"></div>
            </div>
        </div>
    `).join('');

    // Animate bars in
    setTimeout(() => {
        container.querySelectorAll('.factor-bar-fill').forEach(bar => {
            bar.style.width = bar.style.width; // trigger reflow
        });
    }, 100);
}


// ── Radar Chart ───────────────────────────────────────────────────────

function renderRadar(factors) {
    const canvas = document.getElementById('radarCanvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const r = 120;

    ctx.clearRect(0, 0, w, h);

    const n = factors.length;
    const angleStep = (2 * Math.PI) / n;

    // Draw grid circles
    for (let level = 1; level <= 4; level++) {
        const lr = (r * level) / 4;
        ctx.beginPath();
        ctx.arc(cx, cy, lr, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw axes and labels
    ctx.font = '11px DM Mono, monospace';
    ctx.fillStyle = '#888880';
    ctx.textAlign = 'center';

    const points = [];
    factors.forEach((f, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        // Axis line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.stroke();

        // Label
        const lx = cx + Math.cos(angle) * (r + 20);
        const ly = cy + Math.sin(angle) * (r + 20);
        ctx.fillText(f.category.split(' ')[0], lx, ly + 4);

        // Data point
        const val = f.score / 100;
        points.push({
            x: cx + Math.cos(angle) * r * val,
            y: cy + Math.sin(angle) * r * val
        });
    });

    // Draw filled area
    ctx.beginPath();
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 240, 96, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#c8f060';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#c8f060';
        ctx.fill();
        ctx.strokeStyle = '#0a0a08';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}


// ── Tab Switching ─────────────────────────────────────────────────────

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));

    document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
    document.getElementById(`panel${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
}


// ── Goal Planner ──────────────────────────────────────────────────────

function buildGoalSelector() {
    const container = document.getElementById('goalSelector');
    container.innerHTML = GOAL_PRESETS.map(g => `
        <div class="goal-option" id="goal-${g.id}" onclick="selectGoalPreset('${g.id}')">
            <span class="goal-icon">${g.icon}</span>
            <span class="goal-label">${g.label}</span>
        </div>
    `).join('');

    // Default select car
    selectGoalPreset('car');
}

function selectGoalPreset(goalId) {
    selectedGoal = GOAL_PRESETS.find(g => g.id === goalId);
    document.querySelectorAll('.goal-option').forEach(el => el.classList.remove('active'));
    document.getElementById(`goal-${goalId}`).classList.add('active');

    if (selectedGoal && goalId !== 'custom') {
        document.getElementById('goalAmount').value = selectedGoal.amount;
        document.getElementById('goalTimeline').value = selectedGoal.months;
    }
}

async function generateGoalPlan() {
    const data = {
        goal: selectedGoal ? selectedGoal.label : 'Custom Goal',
        target_amount: parseFloat(document.getElementById('goalAmount').value),
        timeline_months: parseInt(document.getElementById('goalTimeline').value),
        current_income: currentProfile ? currentProfile.data.INCOME : 15000,
        current_savings: parseFloat(document.getElementById('goalSavings').value),
        credit_score: currentScore || 500,
        role: currentProfile ? currentProfile.data.ROLE : (ROLE_INFO[currentRole]?.roleName || 'General')
    };

    showLoader(true);
    try {
        const resp = await fetch(`${API_BASE}/goal-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const plan = await resp.json();
        if (plan.error) throw new Error(plan.error);
        renderGoalPlan(plan);
    } catch (err) {
        console.error('Goal plan error:', err);
        renderGoalPlanFallback(data);
    }
    showLoader(false);
}

function renderGoalPlan(plan) {
    document.getElementById('goalResults').style.display = 'block';

    // Feasibility banner
    const fIcons = { Achievable: '\u2705', Moderate: '\u26A0\uFE0F', Challenging: '\u{1F534}' };
    document.getElementById('feasibilityBanner').innerHTML = `
        <div class="feasibility-banner ${plan.feasibility.toLowerCase()}">
            <span class="feasibility-icon">${fIcons[plan.feasibility]}</span>
            <div class="feasibility-text">
                <strong>${plan.feasibility}</strong>
                ${plan.feasibility_note}
            </div>
        </div>
    `;

    // Savings summary cards
    document.getElementById('savingsSummary').innerHTML = `
        <div class="savings-card">
            <div class="savings-value" style="color:var(--accent-blue);">\u20B9${Math.round(plan.monthly_savings_needed).toLocaleString()}</div>
            <div class="savings-label">Monthly Savings Needed</div>
        </div>
        <div class="savings-card">
            <div class="savings-value" style="color:var(--accent-green);">${plan.savings_ratio}%</div>
            <div class="savings-label">Of Monthly Income</div>
        </div>
        <div class="savings-card">
            <div class="savings-value" style="color:var(--accent-amber);">${plan.target_score}</div>
            <div class="savings-label">Target Credit Score</div>
        </div>
        ${plan.estimated_emi ? `<div class="savings-card">
            <div class="savings-value" style="color:var(--accent-purple);">\u20B9${Math.round(plan.estimated_emi).toLocaleString()}</div>
            <div class="savings-label">Estimated EMI</div>
        </div>` : ''}
    `;

    // Timeline phases
    document.getElementById('roadmapTimeline').innerHTML = plan.phases.map(phase => `
        <div class="phase-card">
            <div class="phase-header">
                <span class="phase-icon">${phase.icon}</span>
                <span class="phase-name">${phase.name}</span>
                <span class="phase-duration">${phase.duration}</span>
            </div>
            <ul class="phase-tasks">
                ${phase.tasks.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <div class="phase-target-score">Target Score: <strong>${phase.target_score}</strong></div>
        </div>
    `).join('');

    // Role tips
    document.getElementById('tipsList').innerHTML = plan.role_tips.map(tip => `<li>${tip}</li>`).join('');
}

function renderGoalPlanFallback(data) {
    // Simple local computation when API is unavailable
    const remaining = Math.max(0, data.target_amount - data.current_savings);
    const monthlySavings = remaining / Math.max(data.timeline_months, 1);
    const ratio = (monthlySavings / Math.max(data.current_income, 1)) * 100;
    const feasibility = ratio > 50 ? 'Challenging' : ratio > 30 ? 'Moderate' : 'Achievable';

    const plan = {
        feasibility: feasibility,
        feasibility_note: feasibility === 'Achievable' ? 'Well within your reach!' : feasibility === 'Moderate' ? 'Achievable with disciplined saving.' : 'Consider extending timeline.',
        monthly_savings_needed: monthlySavings,
        savings_ratio: Math.round(ratio),
        target_score: data.target_amount > 300000 ? 700 : 600,
        estimated_emi: null,
        phases: [
            { name: 'Build Foundation', duration: `${Math.max(3, Math.floor(data.timeline_months / 4))} months`, icon: '\u{1F3D7}\uFE0F', tasks: ['Open savings account', 'Start saving regularly', 'Set up auto-debit for bills'], target_score: (data.credit_score || 500) + 30 },
            { name: 'Strengthen Credit', duration: `${Math.max(3, Math.floor(data.timeline_months / 4))} months`, icon: '\u{1F4C8}', tasks: ['Increase monthly savings', 'Build UPI history', 'Apply for small credit line'], target_score: (data.credit_score || 500) + 80 },
            { name: 'Achieve Goal', duration: `${Math.max(3, Math.ceil(data.timeline_months / 2))} months`, icon: '\u{1F3AF}', tasks: ['Apply for financing', 'Compare loan offers', 'Complete purchase!'], target_score: data.target_amount > 300000 ? 700 : 600 },
        ],
        role_tips: [
            'Pay all bills on time consistently',
            'Increase your UPI and digital payment usage',
            "Build an emergency fund of 3 months' expenses"
        ]
    };

    renderGoalPlan(plan);
}


// ── Custom Profile Form ───────────────────────────────────────────────

function buildCustomForm() {
    const container = document.getElementById('customForm');
    let html = '';

    CUSTOM_FIELDS.forEach(section => {
        html += `<div class="form-section-title">${section.section}</div>`;
        section.fields.forEach(field => {
            html += `<div class="form-group">`;
            html += `<label>${field.label}</label>`;
            if (field.type === 'select') {
                html += `<select class="form-select" id="cf_${field.key}">`;
                field.options.forEach(opt => {
                    const selected = opt === field.default ? 'selected' : '';
                    html += `<option value="${opt}" ${selected}>${opt}</option>`;
                });
                html += `</select>`;
            } else {
                html += `<input type="number" class="form-input" id="cf_${field.key}" 
                    value="${field.default}" min="${field.min}" max="${field.max}" 
                    ${field.step ? `step="${field.step}"` : ''}>`;
            }
            html += `</div>`;
        });
    });

    container.innerHTML = html;
}

function submitCustomProfile() {
    const data = {};
    CUSTOM_FIELDS.forEach(section => {
        section.fields.forEach(field => {
            const el = document.getElementById(`cf_${field.key}`);
            if (el) {
                data[field.key] = field.type === 'select' ? el.value : parseFloat(el.value);
            }
        });
    });

    // Add role
    data.ROLE = document.getElementById('customRoleSelect').value;

    // Score it
    currentProfile = { data, name: 'Custom Profile', story: 'Your custom profile' };
    scoreProfile(data);
    switchTab('score');
}

function resetCustomForm() {
    CUSTOM_FIELDS.forEach(section => {
        section.fields.forEach(field => {
            const el = document.getElementById(`cf_${field.key}`);
            if (el) el.value = field.default;
        });
    });
}


// ── Utilities ─────────────────────────────────────────────────────────

function showLoader(show) {
    const loader = document.getElementById('loader');
    if (show) loader.classList.add('active');
    else loader.classList.remove('active');
}

// Format currency
function formatCurrency(num) {
    return '\u20B9' + Math.round(num).toLocaleString('en-IN');
}
