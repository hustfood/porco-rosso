import io from 'socket.io-client';
let socket = io('http://' + document.domain + ':' + location.port + '/barrage');
socket.on('connect', () => {
    console.log('connected');
});

export default socket;

