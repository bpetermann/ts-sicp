import fs from 'node:fs/promises'
import colors from 'colors'
import simpleGit from 'simple-git'

const BASE_BOOK = 'https://sourceacademy.org/sicpjs/' as const
const README = './README.md' as const

const commit = async (bookmark: string) => {
  try {
    await simpleGit().add(README).commit(`Update bookmark to ${bookmark} 🔖`).push('origin', 'main')
    console.log('Changes committed and pushed successfully')
  } catch (error) {
    console.error('Error committing changes:', error)
  }
}

const updateText = (data: string, bookmark: string) =>
  data
    .split('\n')
    .map((line) => (line.startsWith('➜ Bookmark') ? `➜ Bookmark: ${BASE_BOOK}${bookmark}` : line))
    .join('\n')

const update = async (bookmark: string) => {
  try {
    const data = await fs.readFile(README, { encoding: 'utf8' })
    const updatedText = updateText(data, bookmark)
    await fs.writeFile(README, updatedText, { encoding: 'utf8' })
    console.log('README.md updated successfully')
    await commit(bookmark) // Ensure commit is awaited
  } catch (error) {
    console.error('Error updating README.md:', error)
  }
}

const bookmarkText = (data: string) => {
  const line = data.split('\n').find((line) => line.startsWith('➜ Bookmark'))
  return line ? line.split('➜ Bookmark: ')[1] : null // Return null if no bookmark is found
}

const logBookmark = async () => {
  try {
    const data = await fs.readFile(README, { encoding: 'utf8' })
    const bookmark = bookmarkText(data)
    if (bookmark) {
      console.log(`${colors.green('➜  ')}${colors.white('Index:    ')}${colors.cyan(BASE_BOOK)}`)
      console.log(`${colors.green('➜  ')}${colors.white('Bookmark: ')}${colors.cyan(`${bookmark}`)}`)
    } else {
      console.log(`${colors.red('No bookmark found in README.md')}`)
    }
  } catch (error) {
    console.error('Error reading README.md:', error)
  }
}

;(async function () {
  if (process.argv[2]) await update(process.argv[2])
  else await logBookmark()
})()
