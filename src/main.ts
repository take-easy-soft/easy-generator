import { Generator } from './core/generator';

import data from "./data"


const generator = new Generator(__dirname)
generator.genrate(data)

