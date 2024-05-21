import './index.css'

const MoneyDetails = props => {
  const {amountDetails} = props
  const {balance, income, expenses} = amountDetails

  return (
    <div className="allCards">
      <div className="balanceDetailsContainer">
        <div className="moneyCardsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="imageIcon"
          />
          <div>
            <p className="cardName">Your Balance</p>
            <p className="amount" data-testid="balanceAmount">
              Rs {balance}
            </p>
          </div>
        </div>
      </div>

      <div className="incomeDetailsContainer">
        <div className="moneyCardsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="imageIcon"
          />
          <div>
            <p className="cardName">Your Income</p>
            <p className="amount" data-testid="incomeAmount">
              Rs {income}
            </p>
          </div>
        </div>
      </div>

      <div className="expensesDetailsContainer">
        <div className="moneyCardsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="expenseImageIcon"
          />
          <div>
            <p className="cardName">Your Expenses</p>
            <p className="amount" data-testid="expensesAmount">
              Rs {expenses}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
