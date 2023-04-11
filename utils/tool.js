export function parsetime(time) {

	var date = new Date(Number(time));
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var x = y + "-" +
		(m < 10 ? "0" + m : m) + "-" +
		(d < 10 ? "0" + d : d) + " " +
		date.toTimeString().substr(0, 8);
	return x;
}
