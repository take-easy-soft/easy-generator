import { Generator } from './core/generator';
import { data } from "./test/mock";

const generator = new Generator(__dirname)
generator.genrate(data)

