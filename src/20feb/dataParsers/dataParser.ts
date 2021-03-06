import { readFileContent, writeToFile } from '../../fileHandlers/fileHandler'

import { Library, InputData } from '../algorithm/Entities'

export const readInputData = (fileName: string): InputData => {
	const inputData = new InputData()

	const contentRows = readFileContent(fileName).split('\n')

	const [bookCount, libraryCount, dayCount] = contentRows[0].split(' ')
	inputData.bookScores = new Map(contentRows[1].split(' ').map((value, index) => { return [index, parseInt(value)] }))//.map(score => parseInt(score))
	inputData.dayCount = parseInt(dayCount)

	const libraries = new Array<Library>()
	let currentLibraryId = 0
	for (let i=0; i<parseInt(libraryCount)*2; i = i+2) {
		// console.log('Library',contentRows[i+2])
		
		const firstLibraryRow = contentRows[i+2]
		const secondLibraryRow = contentRows[i+3]
		
		let [bookCount, signupDuration, shippableBookCount] = firstLibraryRow.split(' ')
		let bookIds = secondLibraryRow.split(' ').map(id => parseInt(id))
		const library: Library = {
			id: currentLibraryId++,
			bookCount: parseInt(bookCount),
			signupDuration: parseInt(signupDuration),
			shippableBookCount: parseInt(shippableBookCount),
			bookIds
		}
		inputData.libraries.push(library)
	}
	return inputData
}

export const writeSubmissionResult = (fileName: string, libs: any[]) => {
	let stringToBeWritten = `${libs.length}\n`

	libs.map(lib => {
		stringToBeWritten += `${lib.id} ${lib.bookCount}\n${lib.bookIds.join(' ')}\n`
	})

	writeToFile(fileName, stringToBeWritten)
}
