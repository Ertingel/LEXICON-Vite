import { useState, useReducer } from "react"
import { todoReducer, TodoEnum, TodoState } from "./todoReducer"

import TodoItem from "./todoItem"
import "./index.scss"

function Uppgift35() {
	const init: TodoState = {
		nextID: 3,
		list: [
			{
				id: 0,
				text: "Pizza",
				completed: false,
				tag: "Food",
				time: new Date(new Date().valueOf() - 100000000),
			},
			{
				id: 1,
				text: "Taco",
				completed: true,
				tag: "Food",
				time: new Date(new Date().valueOf() - 10000000),
			},
			{
				id: 2,
				text: "Snacks",
				completed: false,
				tag: "Food",
				time: new Date(new Date().valueOf() - 1000000),
			},
		],
	}

	const [todo, todoDispatch] = useReducer(todoReducer, init)

	const [filter, setFilter] = useState("")
	const [addText, setAddText] = useState("")
	const [addTag, setAddTag] = useState("")

	return (
		<section id="Uppgift35">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
			/>

			<div id="background"></div>

			<main id="todo">
				<h1>TODO</h1>

				<div id="todo-filter">
					<input
						id="todo-filter-text"
						type="text"
						placeholder="Filter"
						value={filter}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setFilter("")
							else setFilter(e.target.value)
						}}
						onBlur={() => {
							setFilter(
								/^\s*$/gu.test(filter) ? "" : filter.trim()
							)
						}}
					/>
					<button
						id="todo-filter-clear"
						className="material-symbols-rounded"
						onClick={() => setFilter("")}
					>
						refresh
					</button>
					<p id="todo-filter-info">{todo.list.length} items</p>
				</div>

				<ul id="todo-list">
					{todo.list.map(item => (
						<TodoItem
							key={item.id}
							item={item}
							todoDispatch={todoDispatch}
						/>
					))}
				</ul>

				<form
					id="todo-add"
					className="todo-item"
					onSubmit={e => {
						let newTag = addTag

						if (/^\s*$/gu.test(newTag)) newTag = ""

						if (!/^\s*$/gu.test(addText))
							todoDispatch({
								type: TodoEnum.NEW,
								text: addText,
								tag: newTag,
							})

						setAddText("")
						setAddTag("")

						e.preventDefault()
					}}
				>
					<input
						id="todo-add-text"
						className="text"
						type="text"
						placeholder="Add To Do"
						required
						value={addText}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setAddText("")
							else setAddText(e.target.value)
						}}
						onBlur={() => {
							setAddText(
								/^\s*$/gu.test(addText) ? "" : addText.trim()
							)
						}}
					/>
					<input
						id="todo-add-tag"
						className="tag"
						type="text"
						placeholder="Untagged"
						value={addTag}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setAddTag("")
							else setAddTag(e.target.value)
						}}
						onBlur={() => {
							setAddTag(
								/^\s*$/gu.test(addTag) ? "" : addTag.trim()
							)
						}}
					/>
					<input
						id="todo-add-button"
						className="completed material-symbols-rounded"
						type="submit"
						value="add"
					/>
					<p className="date">Add</p>
				</form>
			</main>
		</section>
	)
}

export default Uppgift35
