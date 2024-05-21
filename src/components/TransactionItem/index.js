import './index.css'

const TransactionItem = props => {
  const {transactionItem, deleteTransaction} = props
  const {id, title, amount, type} = transactionItem

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  const titleDisplay = type === 'INCOME' ? 'Income' : 'Expenses'

  return (
    <li className="row">
      <p className="column">{title}</p>
      <p className="column">Rs {amount}</p>
      <p className="column">{titleDisplay}</p>
      <button
        type="button"
        className="deleteBtn"
        onClick={onDeleteTransaction}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delImg"
        />
      </button>
    </li>
  )
}

export default TransactionItem
