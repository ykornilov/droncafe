document.addEventListener('DOMContentLoaded', ()=> {
	const socket = io('/client');

	socket.on('auth', data => {
		console.log(data);
		document.querySelector('form').style.display = 'none';
	});
	socket.on('menu', (data) => {
		console.log(data);
	});

	document.querySelector('form').addEventListener('submit', event => {
		event.preventDefault();
		socket.emit('login', {
			name: document.querySelector('[name=login]').value,
			email: document.querySelector('[name=email]').value
		});
	});
});