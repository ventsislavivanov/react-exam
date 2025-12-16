
export function egnValidate(egn) {
	if (egn === null || egn === '') {
		return true;
	}

	const helpNumbers = [2, 4, 8, 5, 10, 9, 7, 3, 6];

	if (egn.length !== 10) {
		return false;
	}

	let year = parseInt(egn.slice(0, 2));
	let month = parseInt(egn.slice(2, 4));
	let day = parseInt(egn.slice(4, 6));

	if (month > 40) {
		if (!checkDate(month - 40, day, (year + 2000))) return false;
	} else if (month > 20) {
		if (!checkDate(month - 20, day, (year + 1800))) return false;
	} else {
		if (!checkDate(month, day, (year + 1900))) return false;
	}

	const checksum = parseInt(egn.slice(9, 10));
	let egnSum = 0;
	for (let i = 0; i < 9; i++) {
		egnSum += egn.slice(i, i + 1) * helpNumbers[i];
	}

	let validCheckSum = egnSum % 11;

	if (validCheckSum === 10) {
		validCheckSum = 0;
	}

	if (checksum !== validCheckSum) {
		return false;
	}

	if (month === 0 || (month >= 13 && month <=20) || (month >= 33 && month <=40) || (month >= 53 && month <=99)) {
		return false;
	}

	let nFebDays = (((year % 4) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28;
	let nMonthDays = [0, 31, nFebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let now = new Date();
	let birthDate = new Date(year, month - 1, day);

	if (day === 0 || day > nMonthDays) {
		return false;
	}

	if (month > 20 && month < 33) {
		if (birthDate.getTime() > now.getTime()) {
			return false
		}
	}

	if (month > 40 && month < 53) {
		if (birthDate.getTime() > now.getTime()) {
			return false
		}
	}

	return true;
}

const checkDate = function(month, day, year) {
	const d = new Date(year, (month - 1), day);

	return d.getFullYear() === year && (d.getMonth() + 1) === month && d.getDate() === Number(day);
}

