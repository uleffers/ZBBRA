const footer = {
    footerText: 'ZBBRA - The zero based react budgetting app'
};

const header = {
    headerText: 'ZBBRA',
    transactionTableMenu: 'Transactions',
    budgetTableMenu: 'Budget',
    visualizationsMenu: 'Dashboard'
};


const currencies = {
    dkk: "kr.",
}
const transactionPage = {
    date: "Date",
    expense: "Expense",
    income: "Income",
    note: "Note",
    category: "Category",
    account: "Account",
    title: "Transactions",
    actions: "Edit",
    currencies,
}

const budgetPage = {
    date: "Date",
    rollingBudget: "Previously budgeted",
    budgeted: "Budgeted",
    spent: "Spent",
    category: "Category",
    result: "Remaining",
    title: "Budget",
    actions: "Edit",
    overview: "Overview",
    toBudget: "To budget",
    income: "Income",
    currencies
}

const visualisationPage = {
    date: "Date",
    title: "Dashboard",
    cashflowCard: "Cashflow",
    income: "Income",
    totalExpense: "Expenses",
    otherCategories: "Other categories",
    topCategories: "Top",
    expand: "Show all",
    collapse: "Collapse",
    detailedGraph: "Detailed",
    groupedGraph: "Grouped",
    currencies
}

const months = {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
}

const dk = {
    footer,
    header,
    budgetPage,
    transactionPage,
    months,
    visualisationPage,
}
export default dk;
