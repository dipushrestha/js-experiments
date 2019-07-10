import { appendPX } from './utils.js';
import Simulation from './Simulation.js';

const WIDTH = 1200;
const HEIGHT = 650;
const FRAME_RATE = 60;
const NUMBER_OF_BALLS = 100;
const CONTAINER = document.getElementById('container');

CONTAINER.style.width = appendPX(WIDTH);
CONTAINER.style.height = appendPX(HEIGHT);

const sim = new Simulation(CONTAINER, WIDTH, HEIGHT, NUMBER_OF_BALLS, FRAME_RATE);

sim.init();
sim.animate();
