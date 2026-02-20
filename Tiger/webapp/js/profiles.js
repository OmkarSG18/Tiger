/**
 * CredAlt — Pre-trained Profile Data
 * 2-3 named personas per role with realistic alternative data signals
 */

const PROFILES = {
    street_vendor: [
        {
            id: "sv1",
            name: "Ramesh Kumar",
            age: 38,
            icon: "🛒",
            story: "Vegetable vendor in Chandni Chowk, Delhi. Sells daily using UPI QR code. Has maintained a savings account for 3 years.",
            data: {
                ROLE: "Street Vendor", INCOME: 18000, UPI_TRANSACTIONS: 85, UPI_AVG_AMOUNT: 120,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.72, MOBILE_RECHARGE_FREQ: 5,
                RENT_PAYMENT: 4000, SAVINGS_BALANCE: 22000, LOAN_REPAYMENT_HISTORY: 0.3,
                DIGITAL_FOOTPRINT: 35, SOCIAL_MEDIA_ACTIVITY: 12, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.55, FAMILY_SIZE: 5, AGE: 38, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 2.0,
                BANK_ACCOUNT_AGE: 3.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 1, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 5,
                PEER_LENDING_SCORE: 0.35
            }
        },
        {
            id: "sv2",
            name: "Lakshmi Devi",
            age: 45,
            icon: "🛒",
            story: "Flower seller near Mahalaxmi Temple, Mumbai. Regular customer base, accepts Paytm/PhonePe. No formal bank loan history.",
            data: {
                ROLE: "Street Vendor", INCOME: 12000, UPI_TRANSACTIONS: 60, UPI_AVG_AMOUNT: 80,
                UTILITY_BILLS_PAID: 4, UTILITY_REGULARITY: 0.65, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 3000, SAVINGS_BALANCE: 15000, LOAN_REPAYMENT_HISTORY: 0.0,
                DIGITAL_FOOTPRINT: 20, SOCIAL_MEDIA_ACTIVITY: 5, EDUCATION_LEVEL: 0,
                EMPLOYMENT_STABILITY: 0.5, FAMILY_SIZE: 4, AGE: 45, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "basic", APP_USAGE_HOURS: 1.0,
                BANK_ACCOUNT_AGE: 1.5, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 2,
                PEER_LENDING_SCORE: 0.2
            }
        },
        {
            id: "sv3",
            name: "Arjun Yadav",
            age: 29,
            icon: "🛒",
            story: "Street food vendor in Lucknow. Tech-savvy, uses Google Pay for 90% of transactions. Recently started saving via a recurring deposit.",
            data: {
                ROLE: "Street Vendor", INCOME: 22000, UPI_TRANSACTIONS: 110, UPI_AVG_AMOUNT: 150,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.78, MOBILE_RECHARGE_FREQ: 4,
                RENT_PAYMENT: 5000, SAVINGS_BALANCE: 28000, LOAN_REPAYMENT_HISTORY: 0.45,
                DIGITAL_FOOTPRINT: 42, SOCIAL_MEDIA_ACTIVITY: 25, EDUCATION_LEVEL: 2,
                EMPLOYMENT_STABILITY: 0.48, FAMILY_SIZE: 3, AGE: 29, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 2.5,
                BANK_ACCOUNT_AGE: 4.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 12,
                PEER_LENDING_SCORE: 0.42
            }
        }
    ],

    domestic_worker: [
        {
            id: "dw1",
            name: "Sunita Bai",
            age: 42,
            icon: "🏠",
            story: "Works in 4 households in Pune. Salary transferred monthly via bank. Never missed a utility payment in 5 years.",
            data: {
                ROLE: "Domestic Worker", INCOME: 14000, UPI_TRANSACTIONS: 15, UPI_AVG_AMOUNT: 300,
                UTILITY_BILLS_PAID: 6, UTILITY_REGULARITY: 0.92, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 3500, SAVINGS_BALANCE: 18000, LOAN_REPAYMENT_HISTORY: 0.2,
                DIGITAL_FOOTPRINT: 12, SOCIAL_MEDIA_ACTIVITY: 8, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.85, FAMILY_SIZE: 4, AGE: 42, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "basic", APP_USAGE_HOURS: 0.5,
                BANK_ACCOUNT_AGE: 6.0, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 1, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 2,
                PEER_LENDING_SCORE: 0.15
            }
        },
        {
            id: "dw2",
            name: "Meena Kumari",
            age: 35,
            icon: "🏠",
            story: "Full-time cook in a Bangalore household. Uses PhonePe for groceries. Has a Post Office savings account.",
            data: {
                ROLE: "Domestic Worker", INCOME: 10000, UPI_TRANSACTIONS: 22, UPI_AVG_AMOUNT: 200,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.80, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 2500, SAVINGS_BALANCE: 8000, LOAN_REPAYMENT_HISTORY: 0.0,
                DIGITAL_FOOTPRINT: 18, SOCIAL_MEDIA_ACTIVITY: 10, EDUCATION_LEVEL: 0,
                EMPLOYMENT_STABILITY: 0.75, FAMILY_SIZE: 5, AGE: 35, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 0.8,
                BANK_ACCOUNT_AGE: 2.0, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 3,
                PEER_LENDING_SCORE: 0.1
            }
        }
    ],

    freelancer: [
        {
            id: "fl1",
            name: "Priya Sharma",
            age: 28,
            icon: "💻",
            story: "Freelance graphic designer in Jaipur. Works on Fiverr and Upwork. Income varies from ₹20K to ₹80K/month.",
            data: {
                ROLE: "Freelancer", INCOME: 45000, UPI_TRANSACTIONS: 55, UPI_AVG_AMOUNT: 1200,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.75, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 12000, SAVINGS_BALANCE: 65000, LOAN_REPAYMENT_HISTORY: 0.6,
                DIGITAL_FOOTPRINT: 78, SOCIAL_MEDIA_ACTIVITY: 65, EDUCATION_LEVEL: 3,
                EMPLOYMENT_STABILITY: 0.45, FAMILY_SIZE: 1, AGE: 28, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 6.0,
                BANK_ACCOUNT_AGE: 5.0, NUM_FINANCIAL_PRODUCTS: 2, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 1, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 40,
                PEER_LENDING_SCORE: 0.65
            }
        },
        {
            id: "fl2",
            name: "Vikram Patel",
            age: 33,
            icon: "💻",
            story: "Content writer & SEO consultant from Ahmedabad. Files ITR regularly. Has a credit card but prefers UPI.",
            data: {
                ROLE: "Freelancer", INCOME: 60000, UPI_TRANSACTIONS: 45, UPI_AVG_AMOUNT: 1800,
                UTILITY_BILLS_PAID: 6, UTILITY_REGULARITY: 0.88, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 15000, SAVINGS_BALANCE: 90000, LOAN_REPAYMENT_HISTORY: 0.75,
                DIGITAL_FOOTPRINT: 82, SOCIAL_MEDIA_ACTIVITY: 55, EDUCATION_LEVEL: 3,
                EMPLOYMENT_STABILITY: 0.55, FAMILY_SIZE: 2, AGE: 33, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 5.5,
                BANK_ACCOUNT_AGE: 8.0, NUM_FINANCIAL_PRODUCTS: 3, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 35,
                PEER_LENDING_SCORE: 0.7
            }
        }
    ],

    migrant_worker: [
        {
            id: "mw1",
            name: "Raju Mandal",
            age: 34,
            icon: "🚂",
            story: "Construction worker from Bihar, working in Gurgaon. Sends ₹5,000 home every month via UPI.",
            data: {
                ROLE: "Migrant Worker", INCOME: 14000, UPI_TRANSACTIONS: 12, UPI_AVG_AMOUNT: 500,
                UTILITY_BILLS_PAID: 3, UTILITY_REGULARITY: 0.45, MOBILE_RECHARGE_FREQ: 6,
                RENT_PAYMENT: 2500, SAVINGS_BALANCE: 5000, LOAN_REPAYMENT_HISTORY: 0.1,
                DIGITAL_FOOTPRINT: 15, SOCIAL_MEDIA_ACTIVITY: 18, EDUCATION_LEVEL: 0,
                EMPLOYMENT_STABILITY: 0.25, FAMILY_SIZE: 6, AGE: 34, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 1.5,
                BANK_ACCOUNT_AGE: 1.0, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 8, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 3,
                PEER_LENDING_SCORE: 0.12
            }
        },
        {
            id: "mw2",
            name: "Sanjay Paswan",
            age: 28,
            icon: "🚂",
            story: "Factory worker from UP, employed in Surat textile mill. Uses money transfer apps regularly to send money to family.",
            data: {
                ROLE: "Migrant Worker", INCOME: 16000, UPI_TRANSACTIONS: 18, UPI_AVG_AMOUNT: 600,
                UTILITY_BILLS_PAID: 4, UTILITY_REGULARITY: 0.55, MOBILE_RECHARGE_FREQ: 7,
                RENT_PAYMENT: 3000, SAVINGS_BALANCE: 10000, LOAN_REPAYMENT_HISTORY: 0.2,
                DIGITAL_FOOTPRINT: 22, SOCIAL_MEDIA_ACTIVITY: 20, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.35, FAMILY_SIZE: 5, AGE: 28, GENDER: "M",
                LOCATION_TYPE: "Semi-Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 2.0,
                BANK_ACCOUNT_AGE: 2.0, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 10, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 5,
                PEER_LENDING_SCORE: 0.18
            }
        }
    ],

    kirana_owner: [
        {
            id: "ko1",
            name: "Mahesh Gupta",
            age: 48,
            icon: "🏪",
            story: "Runs a kirana store in Indore for 15 years. 200+ UPI transactions monthly from customers. MUDRA loan recipient.",
            data: {
                ROLE: "Kirana Store Owner", INCOME: 40000, UPI_TRANSACTIONS: 180, UPI_AVG_AMOUNT: 350,
                UTILITY_BILLS_PAID: 6, UTILITY_REGULARITY: 0.95, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 8000, SAVINGS_BALANCE: 70000, LOAN_REPAYMENT_HISTORY: 0.82,
                DIGITAL_FOOTPRINT: 45, SOCIAL_MEDIA_ACTIVITY: 15, EDUCATION_LEVEL: 2,
                EMPLOYMENT_STABILITY: 0.92, FAMILY_SIZE: 5, AGE: 48, GENDER: "M",
                LOCATION_TYPE: "Semi-Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 3.0,
                BANK_ACCOUNT_AGE: 12.0, NUM_FINANCIAL_PRODUCTS: 2, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 15,
                PEER_LENDING_SCORE: 0.6
            }
        },
        {
            id: "ko2",
            name: "Fatima Begum",
            age: 40,
            icon: "🏪",
            story: "Runs a small general store in Hyderabad's old city. Recently digitized payments. Growing customer base.",
            data: {
                ROLE: "Kirana Store Owner", INCOME: 25000, UPI_TRANSACTIONS: 90, UPI_AVG_AMOUNT: 250,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.82, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 6000, SAVINGS_BALANCE: 35000, LOAN_REPAYMENT_HISTORY: 0.5,
                DIGITAL_FOOTPRINT: 30, SOCIAL_MEDIA_ACTIVITY: 10, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.78, FAMILY_SIZE: 4, AGE: 40, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 2.0,
                BANK_ACCOUNT_AGE: 5.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 1, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 8,
                PEER_LENDING_SCORE: 0.4
            }
        }
    ],

    gig_worker: [
        {
            id: "gw1",
            name: "Deepak Singh",
            age: 26,
            icon: "🛵",
            story: "Zomato / Swiggy delivery rider in Noida. Works 10-12 hours daily. Income directly deposited to bank account.",
            data: {
                ROLE: "Gig Worker", INCOME: 22000, UPI_TRANSACTIONS: 60, UPI_AVG_AMOUNT: 250,
                UTILITY_BILLS_PAID: 4, UTILITY_REGULARITY: 0.58, MOBILE_RECHARGE_FREQ: 4,
                RENT_PAYMENT: 5000, SAVINGS_BALANCE: 12000, LOAN_REPAYMENT_HISTORY: 0.3,
                DIGITAL_FOOTPRINT: 55, SOCIAL_MEDIA_ACTIVITY: 40, EDUCATION_LEVEL: 2,
                EMPLOYMENT_STABILITY: 0.35, FAMILY_SIZE: 2, AGE: 26, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 6.0,
                BANK_ACCOUNT_AGE: 2.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 2, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 25,
                PEER_LENDING_SCORE: 0.35
            }
        },
        {
            id: "gw2",
            name: "Ananya Reddy",
            age: 24,
            icon: "🛵",
            story: "Uber driver & part-time Dunzo delivery in Hyderabad. Manages vehicle EMI alongside daily earnings.",
            data: {
                ROLE: "Gig Worker", INCOME: 28000, UPI_TRANSACTIONS: 75, UPI_AVG_AMOUNT: 350,
                UTILITY_BILLS_PAID: 5, UTILITY_REGULARITY: 0.65, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 7000, SAVINGS_BALANCE: 18000, LOAN_REPAYMENT_HISTORY: 0.55,
                DIGITAL_FOOTPRINT: 62, SOCIAL_MEDIA_ACTIVITY: 45, EDUCATION_LEVEL: 2,
                EMPLOYMENT_STABILITY: 0.4, FAMILY_SIZE: 1, AGE: 24, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 7.0,
                BANK_ACCOUNT_AGE: 3.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 30,
                PEER_LENDING_SCORE: 0.45
            }
        }
    ],

    student: [
        {
            id: "st1",
            name: "Rohan Mehta",
            age: 21,
            icon: "🎓",
            story: "B.Tech student at VIT Vellore. Part-time tutor on Unacademy. Uses UPI for canteen, books, and subscriptions.",
            data: {
                ROLE: "College Student", INCOME: 5000, UPI_TRANSACTIONS: 45, UPI_AVG_AMOUNT: 150,
                UTILITY_BILLS_PAID: 2, UTILITY_REGULARITY: 0.5, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 6000, SAVINGS_BALANCE: 8000, LOAN_REPAYMENT_HISTORY: 0.0,
                DIGITAL_FOOTPRINT: 85, SOCIAL_MEDIA_ACTIVITY: 75, EDUCATION_LEVEL: 3,
                EMPLOYMENT_STABILITY: 0.15, FAMILY_SIZE: 1, AGE: 21, GENDER: "M",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 5.0,
                BANK_ACCOUNT_AGE: 1.5, NUM_FINANCIAL_PRODUCTS: 0, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 0, E_COMMERCE_ACTIVITY: 30,
                PEER_LENDING_SCORE: 0.2
            }
        },
        {
            id: "st2",
            name: "Kavya Nair",
            age: 22,
            icon: "🎓",
            story: "MBA student at XLRI. Has an education loan. Earns from freelance content writing and Instagram.",
            data: {
                ROLE: "College Student", INCOME: 8000, UPI_TRANSACTIONS: 50, UPI_AVG_AMOUNT: 200,
                UTILITY_BILLS_PAID: 3, UTILITY_REGULARITY: 0.6, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 7000, SAVINGS_BALANCE: 12000, LOAN_REPAYMENT_HISTORY: 0.15,
                DIGITAL_FOOTPRINT: 90, SOCIAL_MEDIA_ACTIVITY: 82, EDUCATION_LEVEL: 3,
                EMPLOYMENT_STABILITY: 0.2, FAMILY_SIZE: 1, AGE: 22, GENDER: "F",
                LOCATION_TYPE: "Urban", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 6.5,
                BANK_ACCOUNT_AGE: 2.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 40,
                PEER_LENDING_SCORE: 0.3
            }
        }
    ],

    rural_farmer: [
        {
            id: "rf1",
            name: "Bhagwan Das",
            age: 52,
            icon: "🌾",
            story: "Rice farmer in West Bengal. Receives PM-KISAN benefit. Sells produce at local mandi via cooperative society.",
            data: {
                ROLE: "Rural Farmer", INCOME: 12000, UPI_TRANSACTIONS: 8, UPI_AVG_AMOUNT: 1500,
                UTILITY_BILLS_PAID: 3, UTILITY_REGULARITY: 0.5, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 0, SAVINGS_BALANCE: 25000, LOAN_REPAYMENT_HISTORY: 0.4,
                DIGITAL_FOOTPRINT: 8, SOCIAL_MEDIA_ACTIVITY: 3, EDUCATION_LEVEL: 0,
                EMPLOYMENT_STABILITY: 0.55, FAMILY_SIZE: 6, AGE: 52, GENDER: "M",
                LOCATION_TYPE: "Rural", DEVICE_TYPE: "basic", APP_USAGE_HOURS: 0.5,
                BANK_ACCOUNT_AGE: 8.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 0,
                PEER_LENDING_SCORE: 0.3
            }
        },
        {
            id: "rf2",
            name: "Kamla Devi",
            age: 44,
            icon: "🌾",
            story: "Dairy farmer in Rajasthan. Sells milk to local cooperative daily. Uses mobile banking introduced by SHG group.",
            data: {
                ROLE: "Rural Farmer", INCOME: 15000, UPI_TRANSACTIONS: 12, UPI_AVG_AMOUNT: 800,
                UTILITY_BILLS_PAID: 4, UTILITY_REGULARITY: 0.6, MOBILE_RECHARGE_FREQ: 3,
                RENT_PAYMENT: 500, SAVINGS_BALANCE: 30000, LOAN_REPAYMENT_HISTORY: 0.55,
                DIGITAL_FOOTPRINT: 12, SOCIAL_MEDIA_ACTIVITY: 5, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.6, FAMILY_SIZE: 5, AGE: 44, GENDER: "F",
                LOCATION_TYPE: "Rural", DEVICE_TYPE: "smartphone", APP_USAGE_HOURS: 1.0,
                BANK_ACCOUNT_AGE: 4.0, NUM_FINANCIAL_PRODUCTS: 1, INSURANCE_STATUS: 0,
                REMITTANCE_FREQUENCY: 1, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 2,
                PEER_LENDING_SCORE: 0.35
            }
        },
        {
            id: "rf3",
            name: "Ramu Kaka",
            age: 58,
            icon: "🌾",
            story: "Cotton farmer in Maharashtra. Owns Kisan Credit Card. Seasonal income with large mandi payments twice a year.",
            data: {
                ROLE: "Rural Farmer", INCOME: 20000, UPI_TRANSACTIONS: 5, UPI_AVG_AMOUNT: 1800,
                UTILITY_BILLS_PAID: 3, UTILITY_REGULARITY: 0.45, MOBILE_RECHARGE_FREQ: 2,
                RENT_PAYMENT: 0, SAVINGS_BALANCE: 38000, LOAN_REPAYMENT_HISTORY: 0.6,
                DIGITAL_FOOTPRINT: 5, SOCIAL_MEDIA_ACTIVITY: 0, EDUCATION_LEVEL: 1,
                EMPLOYMENT_STABILITY: 0.5, FAMILY_SIZE: 7, AGE: 58, GENDER: "M",
                LOCATION_TYPE: "Rural", DEVICE_TYPE: "basic", APP_USAGE_HOURS: 0.3,
                BANK_ACCOUNT_AGE: 10.0, NUM_FINANCIAL_PRODUCTS: 2, INSURANCE_STATUS: 1,
                REMITTANCE_FREQUENCY: 0, GOVT_SUBSIDY_RECIPIENT: 1, E_COMMERCE_ACTIVITY: 0,
                PEER_LENDING_SCORE: 0.4
            }
        }
    ]
};

// Role display info
const ROLE_INFO = {
    street_vendor: { name: "Street Vendor", icon: "🛒", roleName: "Street Vendor" },
    domestic_worker: { name: "Domestic Worker", icon: "🏠", roleName: "Domestic Worker" },
    freelancer: { name: "Freelancer", icon: "💻", roleName: "Freelancer" },
    migrant_worker: { name: "Migrant Worker", icon: "🚂", roleName: "Migrant Worker" },
    kirana_owner: { name: "Kirana Store Owner", icon: "🏪", roleName: "Kirana Store Owner" },
    gig_worker: { name: "Gig Worker", icon: "🛵", roleName: "Gig Worker" },
    student: { name: "College Student", icon: "🎓", roleName: "College Student" },
    rural_farmer: { name: "Rural Farmer", icon: "🌾", roleName: "Rural Farmer" },
    custom: { name: "Custom Profile", icon: "✨", roleName: "Custom" }
};

// Goal presets
const GOAL_PRESETS = [
    { id: "car", icon: "🚗", label: "Buy a Car", amount: 600000, months: 24 },
    { id: "house", icon: "🏠", label: "Build a House", amount: 2000000, months: 60 },
    { id: "phone", icon: "📱", label: "Buy a Phone", amount: 25000, months: 6 },
    { id: "education", icon: "🎓", label: "Education Loan", amount: 500000, months: 36 },
    { id: "business", icon: "💼", label: "Start Business", amount: 300000, months: 18 },
    { id: "custom", icon: "🎯", label: "Custom Goal", amount: 100000, months: 12 },
];

// Custom form field definitions
const CUSTOM_FIELDS = [
    {
        section: "Personal Info", fields: [
            { key: "AGE", label: "Age", type: "number", min: 18, max: 70, default: 30 },
            { key: "GENDER", label: "Gender", type: "select", options: ["M", "F"], default: "M" },
            { key: "FAMILY_SIZE", label: "Family Size", type: "number", min: 1, max: 10, default: 4 },
            { key: "EDUCATION_LEVEL", label: "Education", type: "select", options: ["0 - No Formal Education", "1 - Primary/Secondary", "2 - Higher Secondary/Diploma", "3 - Graduate/Post-Graduate"], default: "1 - Primary/Secondary" },
            { key: "LOCATION_TYPE", label: "Location", type: "select", options: ["Urban", "Semi-Urban", "Rural"], default: "Urban" },
            { key: "DEVICE_TYPE", label: "Device", type: "select", options: ["basic", "smartphone"], default: "smartphone" },
        ]
    },
    {
        section: "Income & Savings", fields: [
            { key: "INCOME", label: "Monthly Income (₹)", type: "number", min: 0, max: 500000, default: 15000 },
            { key: "SAVINGS_BALANCE", label: "Savings Balance (₹)", type: "number", min: 0, max: 1000000, default: 10000 },
            { key: "RENT_PAYMENT", label: "Monthly Rent (₹)", type: "number", min: 0, max: 50000, default: 3000 },
            { key: "EMPLOYMENT_STABILITY", label: "Employment Stability (0-1)", type: "number", min: 0, max: 1, step: 0.05, default: 0.5 },
            { key: "BANK_ACCOUNT_AGE", label: "Bank Account Age (yrs)", type: "number", min: 0, max: 30, step: 0.5, default: 2 },
        ]
    },
    {
        section: "Payment Behavior", fields: [
            { key: "UPI_TRANSACTIONS", label: "Monthly UPI Txns", type: "number", min: 0, max: 500, default: 30 },
            { key: "UPI_AVG_AMOUNT", label: "Avg UPI Amount (₹)", type: "number", min: 0, max: 10000, default: 200 },
            { key: "UTILITY_BILLS_PAID", label: "Utility Bills (/6)", type: "number", min: 0, max: 6, default: 4 },
            { key: "UTILITY_REGULARITY", label: "Bill Regularity (0-1)", type: "number", min: 0, max: 1, step: 0.05, default: 0.7 },
            { key: "LOAN_REPAYMENT_HISTORY", label: "Loan Repay Score (0-1)", type: "number", min: 0, max: 1, step: 0.05, default: 0.3 },
            { key: "MOBILE_RECHARGE_FREQ", label: "Mobile Recharges/month", type: "number", min: 0, max: 15, default: 3 },
        ]
    },
    {
        section: "Digital & Social", fields: [
            { key: "DIGITAL_FOOTPRINT", label: "Digital Footprint (0-100)", type: "number", min: 0, max: 100, default: 30 },
            { key: "SOCIAL_MEDIA_ACTIVITY", label: "Social Media (0-100)", type: "number", min: 0, max: 100, default: 20 },
            { key: "APP_USAGE_HOURS", label: "App Usage (hrs/day)", type: "number", min: 0, max: 15, step: 0.5, default: 2 },
            { key: "E_COMMERCE_ACTIVITY", label: "E-Commerce (0-100)", type: "number", min: 0, max: 100, default: 10 },
        ]
    },
    {
        section: "Other Signals", fields: [
            { key: "NUM_FINANCIAL_PRODUCTS", label: "Financial Products", type: "number", min: 0, max: 10, default: 1 },
            { key: "INSURANCE_STATUS", label: "Has Insurance", type: "select", options: ["0", "1"], default: "0" },
            { key: "REMITTANCE_FREQUENCY", label: "Remittances/month", type: "number", min: 0, max: 15, default: 1 },
            { key: "GOVT_SUBSIDY_RECIPIENT", label: "Govt Subsidy", type: "select", options: ["0", "1"], default: "0" },
            { key: "PEER_LENDING_SCORE", label: "Peer Lending (0-1)", type: "number", min: 0, max: 1, step: 0.05, default: 0.2 },
        ]
    }
];
