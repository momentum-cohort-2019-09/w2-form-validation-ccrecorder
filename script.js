// console.log('Add validation!');

function q(selector) {
	return document.querySelector(selector);
}

function qs(selector) {
	return document.querySelectorAll(selector);
}

function clearErrors(field) {
	// field.parentNode.classList.remove('input-invalid', 'input-valid');
	const fieldContainer = field.parentNode;
	for (let msg of fieldContainer.querySelectorAll('.error-message')) {
		msg.remove();
	}
}

function markValid(field) {
	clearErrors(field);
	field.parentNode.classList.remove('input-invalid');
	field.parentNode.classList.add('input-valid');
}

function markInvalid(field, errorMsg) {
	clearErrors(field);
	const fieldContainer = field.parentNode;
	field.parentNode.classList.remove('input-valid');
	field.parentNode.classList.add('input-invalid');

	if (errorMsg) {
		const errorPara = document.createElement('p');
		errorPara.classList.add('input-hint', 'text-danger', 'error-message');
		errorPara.innerText = errorMsg;
		fieldContainer.appendChild(errorPara);
	}
}

function isDateTodayOrLater(date) {
	let now = new Date();
	now.setUTCHours(0, 0, 0, 0);
	return date >= now;
}

function validateCardNumber(number) {
	var regex = new RegExp('^[0-9]{16}$');
	if (!regex.test(number)) return false;

	return luhnCheck(number);
}

function luhnCheck(val) {
	var sum = 0;
	for (var i = 0; i < val.length; i++) {
		var intVal = parseInt(val.substr(i, 1));
		if (i % 2 == 0) {
			intVal *= 2;
			if (intVal > 9) {
				intVal = 1 + intVal % 10;
			}
		}
		sum += intVal;
	}
	return sum % 10 == 0;
}

//Checks Name
q('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let nameText = q('#name');
	let name = nameText.value.trim();
	if (!name) {
		markInvalid(nameText, 'Name, bitch!');
	} else {
		markValid(nameText);
	}
});

//Checks Car fields
q('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let boxes = q('.input-group').children;
	let boxesArray = [];
	for (idx = 0; idx < boxes.length; idx++) {
		boxesArray.push(boxes[idx].value);
		if (!boxesArray[idx]) {
			markInvalid(boxes[0].parentNode, 'Fill it all out');
		} else if (boxesArray[0] < 1900 || boxesArray[0] > 2020 || isNaN(boxesArray[0])) {
			markInvalid(boxes[0].parentNode, 'Must be a Valid year');
		} else {
			markValid(boxes[0].parentNode);
		}
	}
});

//Checks Number of Days
q('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let daysTextParent = q('#days');
	let daysText = daysTextParent.value.trim();
	if (!daysText) {
		markInvalid(daysTextParent, 'Must be a valid date');
	} else {
		markValid(daysTextParent);
	}
});

//Checks Credit Card

//Checks CVV

//Checks Exp
