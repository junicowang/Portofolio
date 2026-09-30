/* ============================================================
   Portfolio / Featured Projects (main section).
   Edit this file only. Structure & design stay the same.
   Tips:
     - Each project has a compact card (title, category, short, tech, tags,
       github, demo, metrics) plus a full detail page.
     - dataPrep, eda, insights, challenges, future, recommendations = ARRAY.
     - overview, problem, dataset, methodology, model, results = STRING.
     - All fields are optional; leave blank or remove if unused.
   ============================================================ */
window.DATA = window.DATA || {};

DATA.projects = [
  {
    id: "bigmart-sales",
    title: "BigMart Sales Prediction",
    category: "Machine Learning",
    short: "Regression model that predicts sales per item per BigMart outlet and identifies the variables that most influence sales.",
    tech: ["Python", "Pandas", "Scikit-learn", "Random Forest", "GridSearchCV"],
    tags: ["Regression", "Feature Engineering", "EDA", "Hyperparameter Tuning"],
    github: "https://github.com/junicowang/Bigmart-Sales---Machine-Learning",
    demo: "",
    metrics: [ {v:"1033.95", k:"RMSE"}, {v:"0.607", k:"R²"} ],
    detail: {
      overview: "Built a regression model to predict sales per item per BigMart outlet while identifying the variables that most influence sales, providing a data driven basis for stock, pricing, and product display strategies.",
      problem: "BigMart has extensive sales data but no predictive model for sales at the item and outlet level, and no clarity on the most influential variables. As a result, decisions on stock, pricing, and product display are not fully data driven.",
      dataset: "Historical BigMart data with product attributes (identifier, weight, category, MRP, visibility, fat content), outlet attributes (identifier, size, type, location, establishment year), and the target variable Item_Outlet_Sales.",
      dataPrep: [
        "Imputed Item_Weight using the mean per Item_Identifier to preserve each product's characteristics.",
        "Imputed Outlet_Size using the mode per Outlet_Type.",
        "Standardized Item_Fat_Content into two categories: Low Fat and Regular.",
        "Replaced Item_Visibility values of 0 (implausible for shelved products) with the median per item.",
        "Dropped Item_Identifier and Outlet_Identifier (high cardinality, not informative).",
        "Transformed Outlet_Establishment_Year into Outlet_Age.",
        "Encoding: binary (Item_Fat_Content), label (Outlet_Size, Location_Type, Type), one hot (Item_Type).",
        "Scaling: RobustScaler (Item_Visibility), MinMaxScaler (Item_MRP), StandardScaler (Item_Weight and Outlet_Age)."
      ],
      eda: [
        "The target distribution is right skewed with several high outliers, kept because they are business valid.",
        "Item_MRP shows the strongest positive correlation with sales, with a multimodal pattern reflecting price tiers.",
        "Item_Visibility shows a weak negative correlation, meaning higher visibility does not always translate into higher sales.",
        "Item_Weight and Outlet_Age show low correlation with the target.",
        "Sales distributions differ significantly across Outlet_Type, Outlet_Size, and Outlet_Location_Type.",
        "Item_Fat_Content has almost no effect on sales."
      ],
      methodology: "Data was split 80/20 into train and test sets. Five regression algorithms were compared as baselines: Linear Regression, Ridge, Lasso, Decision Tree, and Random Forest. Random Forest was selected as the best model and then tuned using GridSearchCV with 5 fold cross validation.",
      model: "Tuned Random Forest Regressor with configuration: max_depth=20, max_features='sqrt', min_samples_leaf=2, min_samples_split=2, n_estimators=200. Feature importance is dominated by Item_MRP, followed by Outlet_Type, then Item_Visibility and Item_Weight, then Outlet_Age and Outlet_Location_Type.",
      metrics: [ {v:"1033.95", k:"RMSE"}, {v:"0.607", k:"R²"}, {v:"5", k:"Models"}, {v:"5 fold", k:"CV"} ],
      results: "Random Forest baseline clearly outperformed the linear models (RMSE 1062.56, R² 0.585 versus R² 0.518 for Linear, Ridge, and Lasso), while a single Decision Tree severely overfit (R² 0.176). After GridSearchCV tuning, the final Random Forest reached RMSE 1033.95 and R² 0.607, an improvement over the baseline, with Item_MRP as the most influential feature followed by Outlet_Type.",
      insights: [
        "Price (Item_MRP) is the main driver of sales, not visibility or product weight.",
        "Outlet characteristics (type, size, location) contribute heavily. Sales are shaped more by where a product is sold than by the product itself.",
        "Tree based and ensemble models substantially outperform linear models because the underlying relationships are non linear and involve feature interactions."
      ],
      challenges: [
        "Missing values were sizeable (17 to 28 percent), requiring granular imputation per group rather than a global fill.",
        "Data inconsistencies (Item_Fat_Content) and implausible zero values on Item_Visibility.",
        "Skewed category distributions (Supermarket Type1 and Fruits and Veg dominance) risked biasing the model toward majority classes.",
        "A single Decision Tree severely overfit (R² 0.176).",
        "Final R² is around 0.6, meaning roughly 40 percent of sales variance is unexplained, likely driven by external factors such as promotions, seasonality, and competitors not present in the data."
      ],
      future: [
        "Add external variables such as promotions, discounts, seasonality, and time trends.",
        "Push tuning further with Bayesian or RandomizedSearch and try XGBoost, LightGBM, or Gradient Boosting.",
        "Retrain periodically with fresh data to keep the model relevant.",
        "Revisit label encoding for Outlet_Location_Type and Outlet_Type. If they are nominal, one hot encoding is safer than assuming a false ordering."
      ],
      recommendations: [
        "Adopt tree based or ensemble models for sales prediction and evaluate the model periodically.",
        "Apply data driven pricing strategy. Since Item_MRP is dominant, prices can be tuned per outlet type or location.",
        "Prioritize distribution of top products to high performing outlets (large Supermarket Types), while giving promotional and visibility support to underperforming outlets.",
        "Integrate the model into a decision support system (DSS) for stock, pricing, and product placement."
      ]
    }
  },
  {
    id: "credit-score-deploy",
    title: "Credit Score Classifier (Model Deployment)",
    category: "Machine Learning / MLOps",
    short: "End to end deployment of a credit risk classifier into three tiers (Good, Standard, Poor), from local development to AWS, serving as a decision support tool for credit screening.",
    tech: ["Python", "Scikit-learn", "Random Forest", "MLflow", "Streamlit", "AWS SageMaker", "AWS EC2", "S3"],
    tags: ["Multi-class Classification", "Pipeline", "Model Deployment", "MLOps"],
    github: "https://github.com/junicowang/-Credit-Score-Classifier-",
    demo: "",
    metrics: [ {v:"71.9%", k:"Accuracy"}, {v:"0.69", k:"Macro F1"} ],
    detail: {
      overview: "Built a credit risk classification system that groups customers into three tiers (Good, Standard, Poor) as a decision support tool during the initial screening step at a financial institution. The project spans the full end to end flow from data cleaning and modeling to artifact serialization and cloud deployment on AWS (SageMaker, S3, and EC2).",
      problem: "Classify customer credit risk into three tiers (Good, Standard, Poor) as decision support for early screening, not full automation, because the model is not yet at a level suitable for final decisions without human review.",
      dataset: "25,000 rows of customer credit data with roughly 29 raw columns covering demographics (age, income), loan history (count, types, multi label), payment behavior (delays, arrears), credit profile (mix, utilization, history), and monthly transactional columns. The data is very dirty: odd placeholders such as _______, !@9#%8, and NM, numeric values stored as strings with underscore characters, and implausible outliers such as ages above 8000. The target is imbalanced with Standard dominating (about 53 percent), Poor (about 29 percent), and Good as the minority class (about 17 percent).",
      dataPrep: [
        "Custom DataCleaner to strip characters, replace placeholders with NaN, and cap outliers to NaN.",
        "Parsed credit history duration and applied multi label encoding for loan types.",
        "Preprocessor built on ColumnTransformer with median or mode imputation and StandardScaler for numeric features.",
        "OneHotEncoder for nominal features and OrdinalEncoder for Credit_Mix.",
        "Stratified 80/20 train and test split. Preprocessing fit only on the training set to prevent data leakage."
      ],
      eda: [
        "Target imbalance: Standard about 53 percent, Poor about 29 percent, Good about 17 percent.",
        "Many invalid placeholders across columns that required per feature handling.",
        "Extreme outliers on age and several numeric fields required capping.",
        "Several numeric fields were stored as strings with extra characters, requiring manual parsing."
      ],
      methodology: "5 fold cross validation compared four models using f1_macro scoring, chosen because of the class imbalance. GridSearchCV was applied only to the best model for efficiency. Full workflow: raw CSV, cleaning, split, preprocessing (fit on train only), 4 model comparison via MLflow, tuning of the best model, test set evaluation, serialization of the full artifact into a single .pkl bundle, and inference via a Predictor class.",
      model: "Random Forest was selected from the default comparison (CV f1_macro 0.6975, slightly ahead of XGBoost 0.6849 and LightGBM 0.6845). During tuning, max_depth was deliberately capped at 10 to keep the model deployable (around 15 MB). This trade off lowered the CV score to 0.6719 while still delivering strong test set performance.",
      metrics: [ {v:"71.9%", k:"Accuracy"}, {v:"0.69", k:"Macro F1"}, {v:"0.61", k:"F1 Good"}, {v:"~15 MB", k:"Model Size"} ],
      results: "The final model reached 71.9 percent accuracy and about 0.69 macro F1 on the test set, with the Good minority class as the weakest (F1 0.61). The full artifact (model, preprocessor, label encoder, cleaner) was serialized into a single .pkl bundle, served via Streamlit locally, then retrained on SageMaker, stored on S3, and served publicly from EC2.",
      insights: [
        "Top features by Random Forest importance: Outstanding_Debt, Interest_Rate, Credit_Mix, and Delay_from_due_date, matching credit domain intuition.",
        "The most valuable technical takeaway: a clean pipeline (train only fit, single bundle artifact serialization) matters far more for system reliability than chasing higher accuracy alone.",
        "Class imbalance makes plain accuracy misleading, which is why f1_macro is the more appropriate metric."
      ],
      challenges: [
        "The dataset was very dirty with different noise patterns per column.",
        "Class imbalance made plain accuracy misleading.",
        "Trade off between accuracy and model size for deployment.",
        "Real world environment mismatch during cloud deployment. SageMaker was trained on scikit-learn 1.7.2 while EC2 defaults installed 1.9.0. The model failed to load until versions were aligned manually."
      ],
      future: [
        "Handle class imbalance with techniques such as SMOTE or class weighting to lift F1 for the Good class.",
        "Add feature engineering based on financial ratios (for example debt to income) to strengthen domain signals.",
        "Introduce CI/CD and environment locking (for example via Docker or pinned requirements.txt) so cloud deployment is reproducible and free of version mismatches.",
        "Add data drift and model performance monitoring for scheduled retraining."
      ],
      recommendations: [
        "Use the model as decision support during early screening, not as a replacement for final human judgment.",
        "Prioritize human review on cases whose predicted class probabilities are close to the decision boundary.",
        "Standardize the environment (library versions and containers) before shipping the model to production.",
        "Integrate the model into the credit analyst workflow as a filtering layer, with periodic performance monitoring."
      ]
    }
  },
  {
    id: "insurance-claims-forecast",
    title: "Individual Health Insurance Claims Forecast",
    category: "Machine Learning / Forecasting",
    short: "Analyzed and forecasted the frequency, severity, and total health insurance claims for AXA Financial Indonesia as a basis for risk selection, prevention, and pricing strategies.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    tags: ["Regression", "Forecasting", "Feature Engineering", "EDA"],
    github: "https://github.com/junicowang/Prediksi-Klaim-Asuransi-Kesehatan-Individu",
    demo: "",
    metrics: [ {v:"5.4%", k:"MAPE Severity"}, {v:"8.1%", k:"MAPE Frequency"} ],
    detail: {
      overview: "A data science project that analyzes and forecasts the frequency, severity, and total individual health insurance claims. Official case study from Data Science Competition ITB 2026 organized together with AXA Financial Indonesia. Code and documentation were refined for portfolio purposes.",
      problem: "Individual health insurance claims rose about 25.5 percent (January to June 2025 versus the same period in 2024). The rise triggered premium adjustments that made the product less affordable. The company needs data driven analysis to understand claim drivers and forecast the trend so it can act on risk selection, prevention, and pricing.",
      dataset: "Data spans January 2024 through July 2025 (19 months), split into two files. Data_Polis.csv (4,096 rows, one row per policy) contains plan code, gender, date of birth, policy effective date, and domicile. Data_Klaim.csv (4,627 rows, one row per claim) contains claim amount, care type, diagnosis (ICD code), hospital admission and discharge dates, and hospital location.",
      dataPrep: [
        "Cleaned dates, handled missing values, duplicates, and cross column consistency.",
        "Feature engineering: customer age, Length of Stay, policy tenure, ICD chapter, and claim month.",
        "Aggregated monthly time series for forecasting.",
        "Kept a single, straight data flow with no data leakage (target does not leak into features)."
      ],
      eda: [
        "Claim distribution and monthly trends were reviewed to detect seasonality and outliers.",
        "Severity analysis per category highlighted the influence of hospital location, care type, and ICD chapter.",
        "Monthly data has only 19 points with a relatively flat trend, so complex models risk overfitting.",
        "Engineered features (age, LOS, tenure, ICD chapter) added meaningful signal to the severity model."
      ],
      methodology: "Workflow: load data, cleaning, feature engineering, EDA, analysis of severity and frequency drivers via feature importance, monthly time series aggregation, then forecasting using two models compared (Linear Regression and Random Forest) with MAPE, and finally the winner was used to forecast 2025 and 2026. Design principles: a single straight data flow, no data leakage, and choose the simplest defensible model given the limited number of monthly data points.",
      model: "Linear Regression was chosen for both targets (frequency and severity) because it slightly outperformed Random Forest on the test set and fits better given the small number of monthly data points. Total claims are derived from the identity frequency times severity to stay consistent with the two component forecasts.",
      metrics: [ {v:"5.4%", k:"MAPE Severity"}, {v:"8.1%", k:"MAPE Frequency"}, {v:"0.51", k:"R² Severity"}, {v:"Rp147.6B", k:"2026 Projection"} ],
      results: "The final model projects total 2026 claims at roughly Rp147.6 billion for the year, averaging 226 claims per month and severity around Rp54.5 million per claim. Linear Regression narrowly beat Random Forest on both targets (frequency MAPE 8.1 percent, severity MAPE 5.4 percent), and feature engineering lifted the severity model R² from 0.32 to 0.51.",
      insights: [
        "The main drivers of severity are Length of Stay, hospitals located in Singapore, policy tenure, age, and ICD chapter C conditions (neoplasms/cancer). Long inpatient stays and serious illnesses are the top cost drivers.",
        "The main drivers of frequency are age and policy tenure, both strongly dominant.",
        "Feature engineering raised severity R² from 0.32 to 0.51, showing the value of thoughtful derived features grounded in domain knowledge.",
        "Linear Regression fits short time series (19 points) with a relatively flat trend better than a more complex model like Random Forest, which tended to overfit."
      ],
      challenges: [
        "Monthly data has only 19 points with a relatively flat pattern, so complex models overfit.",
        "Date consistency, missing values, and duplicates across two data sources (policies and claims) required careful cleaning.",
        "Preventing data leakage between features and target during monthly aggregation.",
        "Interpretation had to stay consistent across three targets (frequency, severity, and total claims)."
      ],
      future: [
        "Add external variables such as medical cost inflation, seasonality, and changes in product coverage.",
        "Test classical time series models (ARIMA, SARIMA, Prophet) and hybrid models once more history is available.",
        "Develop risk segmentation per plan or location for more precise pricing.",
        "Add regular backtesting and model performance monitoring."
      ],
      recommendations: [
        "Apply risk based premium adjustments that account for LOS, age, and history of serious illness as key factors.",
        "Run prevention programs (health check-ups and health education) for high age and high tenure segments to lower claim frequency.",
        "Review the hospital partner strategy, especially for Singapore locations that drive high severity.",
        "Use the model as decision support in annual planning, with periodic retraining as new data becomes available."
      ]
    }
  },
  {
    id: "sparc-repeat-priority",
    title: "Repeat Order Follow-up Priority Prediction",
    category: "Machine Learning",
    short: "Classification model that predicts which customers are likely to make a repeat purchase, helping the sales team prioritize follow-up with 2.7x lift in the top decile.",
    tech: ["Python", "Pandas", "Scikit-learn", "LightGBM", "Matplotlib", "Seaborn"],
    tags: ["Classification", "Feature Engineering", "Class Imbalance", "Business Impact"],
    github: "https://github.com/junicowang/Prediksi-Prioritas-Follow-up-Repeat-Order",
    demo: "",
    metrics: [ {v:"0.75", k:"ROC-AUC"}, {v:"2.7x", k:"Lift Top 10%"} ],
    detail: {
      overview: "An end to end machine learning project to predict which customers are likely to make a repeat order, so the sales team can prioritize follow-up on customers with the highest repeat probability. Case study from the SPARC 2026 competition (Ciputra University) developed with Team TrioTunggal. Code and documentation were refined for portfolio purposes.",
      problem: "An automotive company wants to leverage its transaction data to prioritize repeat order follow-up. The challenges: the dataset is transactional (one row equals one transaction) and has no ready made target column. Business question: given a customer's first transaction profile, how likely are they to make a repeat purchase, and which customers should be contacted first?",
      dataset: "Automotive vehicle transaction data from the SPARC 2026 competition containing about 320,000 transactions across 28 columns. The target is highly imbalanced, with only about 13 percent of customers making a repeat order. In line with competition rules, the dataset is not distributed in the public repository.",
      dataPrep: [
        "Target engineering: is_repeat equals 1 when a customer has more than one transaction. Built before feature cleaning to keep the label uncontaminated.",
        "Anti leakage: each customer is represented by their earliest (first) transaction, not the latest, to mirror real conditions when a follow-up decision is made.",
        "Data cleaning: parsed mixed format Rupiah and date values, corrected age from date of birth, and handled anomalies with business logic.",
        "Feature engineering: log transforms (OTR, DP, installment), ratio features (dp_ratio, installment_ratio), and frequency encoding for high cardinality columns.",
        "Scikit-learn Pipeline with ColumnTransformer (imputation, scaling, One Hot Encoding) to prevent data leakage during cross validation."
      ],
      eda: [
        "Target is highly imbalanced with only about 13 percent of customers making repeat orders.",
        "OTR, DP, and installment amounts show high skew, calling for log transformation.",
        "Several columns are high cardinality (sub district, type series, color) and do not fit standard one hot encoding.",
        "Demographic traits (age, occupation) and financing profiles correlate with repeat behavior."
      ],
      methodology: "Compared four models in stages: a Dummy baseline as a performance floor, Logistic Regression as a linear baseline, Random Forest as an ensemble baseline, and LightGBM as the final candidate. Data was stratified 80/20 into train and test. Class imbalance was handled with class weighting, followed by hyperparameter tuning on the best model. Evaluation covered ROC-AUC, PR-AUC, Precision/Recall/F1, plus threshold tuning, feature importance (gain and permutation), and gains/lift charts for business impact.",
      model: "Tuned LightGBM was selected as the final model with ROC-AUC around 0.75, outperforming Random Forest (0.73), Logistic Regression (0.71), and the Dummy baseline (0.50). Feature importance highlights age, occupation, product traits and price (OTR, type series, color), location (sub district), and financing profile (installment/DP ratio, dealer) as the main repeat drivers.",
      metrics: [ {v:"0.75", k:"ROC-AUC"}, {v:"0.33", k:"PR-AUC"}, {v:"0.71", k:"Recall"}, {v:"2.7x", k:"Lift Top 10%"} ],
      results: "The model turns follow-up decisions from random into targeted. Contacting the top 30 percent of scored customers reaches roughly 60 percent of all repeaters. The top decile has a lift of about 2.7 times the average. The final output is prioritas_followup.csv, which contains the score and priority tier for each customer.",
      insights: [
        "Contacting the top 10 percent of scored customers already covers 27 percent of all repeaters (2.7x lift).",
        "Contacting the top 30 percent covers 60 percent of repeaters, much more efficient than random follow-up.",
        "Anti leakage by using each customer's first transaction is essential to mirror real world timing and preserve evaluation validity.",
        "LightGBM with class imbalance handling and tuning consistently outperformed both linear and classical ensemble baselines."
      ],
      challenges: [
        "Transactional data with no ready made target, so the target had to be engineered first.",
        "Class imbalance with only 13 percent positives makes plain accuracy misleading.",
        "High cardinality columns (sub district, type series) require special encoding strategy such as frequency encoding.",
        "Inconsistent data formats (Rupiah, dates) required manual parsing.",
        "Careful separation between target engineering and feature engineering to avoid data leakage."
      ],
      future: [
        "Add external features (season, dealer promotions, automotive market trends) to enrich signal.",
        "Try other boosters (XGBoost, CatBoost) and calibrated probabilities for probability based follow-up planning.",
        "Design cost sensitive evaluation that accounts for contact cost versus repeat order value.",
        "Add model performance monitoring and periodic retraining on fresh data."
      ],
      recommendations: [
        "Prioritize follow-up on the top decile to maximize conversion at minimum cost.",
        "Use an adaptive threshold based on sales team capacity, for example top 20 to 30 percent when resources are limited.",
        "Integrate the prioritas_followup.csv output into the CRM as a daily follow-up queue.",
        "Retrain monthly or quarterly with fresh data to keep the model accurate as customer patterns shift."
      ]
    }
  }
];
