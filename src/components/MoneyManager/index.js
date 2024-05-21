import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    inputDetailsStoreList: [],
    moneyDetails: {
      balance: 0,
      income: 0,
      expenses: 0,
    },
  }

  deleteTransaction = id => {
    this.setState(prevState => {
      const updatedTransactions = prevState.inputDetailsStoreList.filter(
        transactionDelete => transactionDelete.id !== id,
      )

      let newIncome = 0
      let newExpenses = 0

      updatedTransactions.forEach(transaction => {
        if (transaction.type === 'INCOME') {
          newIncome += transaction.amount
        } else {
          newExpenses += transaction.amount
        }
      })

      const newBalance = newIncome - newExpenses

      // Update state with the new transactions list, income, expenses, and balance
      return {
        inputDetailsStoreList: updatedTransactions,
        moneyDetails: {
          income: newIncome,
          expenses: newExpenses,
          balance: newBalance,
        },
      }
    })
  }

  addTransactionToHistoryAndMoneyDetails = event => {
    event.preventDefault()

    const {titleInput, amountInput, typeInput} = this.state
    const amount = parseInt(amountInput)

    const newTransaction = {
      id: uuidV4(),
      title: titleInput,
      amount,
      type: typeInput,
    }

    // Update the list of transactions in the state
    this.setState(prevState => ({
      inputDetailsStoreList: [
        ...prevState.inputDetailsStoreList,
        newTransaction,
      ],
      titleInput: '',
      amountInput: '',
    }))

    // Then, update the money details
    this.setState(prevState => {
      const {balance, income, expenses} = prevState.moneyDetails
      let newBalance = balance
      let newIncome = income
      let newExpenses = expenses

      if (typeInput === 'INCOME') {
        newBalance += amount
        newIncome += amount
      } else {
        newBalance -= amount
        newExpenses += amount
      }

      return {
        moneyDetails: {
          balance: newBalance,
          income: newIncome,
          expenses: newExpenses,
        },
      }
    })
  }

  typeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  amountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  titleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  render() {
    const {
      moneyDetails,
      inputDetailsStoreList,
      typeInput,
      amountInput,
      titleInput,
    } = this.state
    return (
      <div className="appContainer">
        <div className="profileContainer">
          <h1 className="userName">Hi, Richard</h1>
          <p className="message">
            Welcome back to your
            <span className="moneyManagerSpan"> Money Manager</span>
          </p>
        </div>

        <MoneyDetails amountDetails={moneyDetails} />

        <div className="inputsAndHistoryContainer">
          <div className="InputsContainer">
            <form className="formContainer">
              <h1 className="addTransactionHeading">Add Transaction</h1>
              <div className="titleContainer">
                <label className="title" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="titleInput"
                  onChange={this.titleInput}
                  value={titleInput}
                />
              </div>

              <div className="amountContainer">
                <label className="amount" htmlFor="amount">
                  AMOUNT
                </label>
                <input
                  type="text"
                  id="amount"
                  className="amountInput"
                  onChange={this.amountInput}
                  value={amountInput}
                />
              </div>

              <div className="typeContainer">
                <label htmlFor="type" className="type">
                  TYPE
                </label>
                <select
                  className="selectionBar"
                  id="type"
                  onChange={this.typeInput}
                  value={typeInput}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.displayText}
                      id={eachOption.optionId}
                      value={eachOption.optionId}
                      className="option"
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="addBtn"
                onClick={this.addTransactionToHistoryAndMoneyDetails}
              >
                Add
              </button>
            </form>
          </div>

          <ul className="tableForTransactions">
            <h1 className="addTransactionHeading">History</h1>
            <li className="headRows">
              <p className="columnName">TITLE</p>
              <p className="columnName">AMOUNT</p>
              <p className="columnName">TYPE</p>
              <p className="columnName">DELETE</p>
            </li>
            {inputDetailsStoreList.map(each => (
              <TransactionItem
                key={each.id}
                transactionItem={each}
                deleteTransaction={this.deleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
