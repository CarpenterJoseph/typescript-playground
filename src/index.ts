import fs, {fdatasync} from 'fs'
import path from 'path'

const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf8').split('\n').map((d) => parseInt(d))

const elvesSnacks: number[] = []

let lastI = -1
for(let i = 0; i < data.length; i++) {
	if(isNaN(data[i])) {
		elvesSnacks.push(data.slice(lastI + 1, i).reduce((a, b) => a + b, 0))
		lastI = i
	}
}

console.log('Part 1: ', Math.max(...elvesSnacks))

function nthLargestElf(n: number) {
	const elvesSnacksCopy: number[] = [...elvesSnacks]
	
	for(let i = 1; i < n; i++) {
		const highestValue: number = Math.max(...elvesSnacksCopy)
		
		elvesSnacksCopy.splice(elvesSnacksCopy.findIndex((e) => e === highestValue))
	}
	
	return Math.max(...elvesSnacksCopy)
}

console.log('Part 2: ', nthLargestElf(1) + nthLargestElf(2) + nthLargestElf(3))