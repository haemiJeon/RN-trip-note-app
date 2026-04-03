export type ExpensesCategoryType = 'FOOD' | 'TRANSPORT' | 'LODGING' | 'ACTIVITY'

export const EXPENSE_CATEGORIES: ExpensesCategoryType[] = [
  'FOOD',
  'ACTIVITY',
  'LODGING',
  'TRANSPORT',
]

export interface CreateExpensesRequestType {
  tripId: string
  category: ExpensesCategoryType
  amount: number
  memo: string
}
