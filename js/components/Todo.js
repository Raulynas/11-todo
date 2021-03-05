class Todo {
	/**
	 * todo konstruktorius
	 */
	constructor() {
		this.storageList = 'tasks21.list';
		this.storageID = 'tasks21.lastID';

		this.formDOM = null;
		this.taskInputDOM = null;
		this.deadlineInputDOM = null;
		this.colorInputDOM = null;
		this.submitDOM = null;
		this.listDOM = null;

		this.tasks = [];
		this.lastID = 0;
	}
	init() {
		this.formDOM = document.querySelector('form');
		this.taskInputDOM = document.getElementById('task');
		this.deadlineInputDOM = document.getElementById('deadline');
		this.colorInputDOM = document.getElementById('boarder');
		this.submitDOM = this.formDOM.querySelector('button');
		this.listDOM = document.querySelector('.list');

		this.addActions();

		// bandymas is local storage atminties istraukti senus irasus
		const oldID = localStorage.getItem(this.storageID);
		const oldList = localStorage.getItem(this.storageList);

		try {
			const parsedoldList = JSON.parse(oldList);
			if (parsedoldList) {
				this.tasks = parsedoldList;
			}
		} catch (error) {
			console.log(error);
		}

		try {
			const pasrseOldID = JSON.parse(oldID);
			if (pasrseOldID) {
				this.lastID = pasrseOldID;
			}
		} catch (error) {
			console.log(error);
			this.lastID = this.tasks.length;
		}
		this.read();
	}

	addActions() {
		this.submitDOM.addEventListener('click', e => {
			e.preventDefault();
			const task = this.taskInputDOM.value;
			const deadline = this.deadlineInputDOM.value;
			const color = this.colorInputDOM.value;
			this.create(task, deadline, color);
		});
	}

	/**
	 * Metodas naujos uzdoties sukurimui
	 * @param {string} text Uzduoties aprsymas, ka reikes daryti
	 * @param {string} deadline Iki kada atlikti, formatas _`yyyy-mm-dd`_
	 * @param {string} boarderColor korteles spalva
	 */
	create(text, deadline, boarderColor) {
		this.tasks.push({
			id: ++this.lastID,
			text,
			deadline,
			boarderColor,
		});
		localStorage.setItem(this.storageID, JSON.stringify(this.lastID));
		localStorage.setItem(this.storageList, JSON.stringify(this.tasks));
		this.read();
	}

	/**
	 * atvaizduoti visas uzduotis
	 */
	read() {
		let HTML = '';
		for (const task of this.tasks) {
			HTML += `<div class="item" style="border-color: ${task.boarderColor}" data-id=${task.id}>
			<div class="actions">
				<div class="edit">Edit</div>
				<div class="delete">Delete</div>
			</div>
			<p>${task.text}</p>
			</div>`;
		}
		this.listDOM.innerHTML = HTML;

		const items = this.listDOM.querySelectorAll('.item');
		for (const item of items) {
			const id = +item.dataset.id;
			const deleteButton = item.querySelector('.delete');
			console.log(deleteButton);

			deleteButton.addEventListener('click', () => {
				this.delete(id, item);
			});
		}
	}

	/**
	 * atnaujinti konkrecios uzduoties informacija
	 */
	update(id) {}
	/**
	 * istrinti vine akonkrecia uzduoti
	 */
	delete(id, item) {
		this.tasks = this.tasks.filter(task => task.id !== id);

		localStorage.setItem(this.storageList, JSON.stringify(this.tasks));
		item.remove();
	}
}
export { Todo };
