import { MetaType } from '@/types/commonType'

export type ExpensesCategoryType = 'FOOD' | 'TRANSPORT' | 'LODGING' | 'ACTIVITY'

export const EXPENSE_CATEGORIES: ExpensesCategoryType[] = [
  'FOOD',
  'ACTIVITY',
  'LODGING',
  'TRANSPORT',
]

export interface CreateExpenseRequestType {
  tripId: string
  category: ExpensesCategoryType
  amount: number
  memo: string
}

export interface ExpensesItemType {
  id: string
  category: ExpensesCategoryType
  amount: number
  createdAt: string | Date
}

export interface ResponseExpensesList {
  data: ExpensesItemType[]
  meta: MetaType
  totalAmount: number
}
