import fs from 'node:fs/promises'
import colors from 'colors'
import simpleGit from 'simple-git'

const BASE_BOOK = 'https://sourceacademy.org/sicpjs/' as const
const README_PATH = './README.md' as const

const success = (text: string) => console.log(`${colors.green(text)}`)
const error = (text: string) => console.error(`${colors.red(text)}`)

const commit = async (bookmark: string) =>
  await simpleGit().add(README_PATH).commit(`Update bookmark to ${bookmark} 🔖`).push('origin', 'main')

const updateText = (data: string, bookmark: string) =>
  data
    .split('\n')
    .map((line) => (line.startsWith('➜ Bookmark') ? `➜ Bookmark: ${BASE_BOOK}${bookmark}` : line))
    .join('\n')

const update = async (bookmark: string) => {
  try {
    const data = await fs.readFile(README_PATH, { encoding: 'utf8' })
    const updatedText = updateText(data, bookmark)
    await fs.writeFile(README_PATH, updatedText, { encoding: 'utf8' })
    success('README.md updated successfully')
    await commit(bookmark)
    success('Changes committed and pushed successfully')
  } catch (e) {
    error(e)
  }
}

const bookmarkText = (data: string) => {
  const line = data.split('\n').find((line) => line.startsWith('➜ Bookmark'))
  return line ? line.split('➜ Bookmark: ')[1] : null
}

const getBookmark = async () => {
  try {
    const data = await fs.readFile(README_PATH, { encoding: 'utf8' })
    const bookmark = bookmarkText(data)
    if (bookmark) {
      console.log(`${colors.green('➜  ')}${colors.white('Index:    ')}${colors.cyan(BASE_BOOK)}`)
      console.log(`${colors.green('➜  ')}${colors.white('Bookmark: ')}${colors.cyan(`${bookmark}`)}`)
    } else error('No bookmark found in README.md')
  } catch (e) {
    error(e)
  }
}

;(async function () {
  if (process.argv[2]) await update(process.argv[2])
  else await getBookmark()
})()
