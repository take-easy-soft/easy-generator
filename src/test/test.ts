import { Generator } from '../core/generator';
import data from "./mock"

const generator = new Generator(process.cwd())
generator.genrate(data)
