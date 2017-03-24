class ExpensesController < ApplicationController

	def index
		@expenses = Expense.all
	end

	def create
		expense = Expense.create(expense_params)

		if expense.save
			render json: expense
		else
			render json: expense.errors, status: :unprocessable_entity
		end
	end

	def update
		expense = Expense.find(params[:id])
		if expense.update(expense_params)
			render json: expense
		else
			render json: expense.errors, status: :unprocessable_entity
		end
	end

	def destroy
		expense = Expense.find(params[:id])
		expense.destroy
		head :no_content
	end

	private

	def expense_params
		params.require(:expense).permit(:date, :title, :amount)
	end
end
