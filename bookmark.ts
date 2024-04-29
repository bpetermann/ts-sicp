import fs from 'node:fs/promises'
import colors from 'colors'
import simpleGit from 'simple-git'

const BASE_BOOK = 'https://sourceacademy.org/sicpjs/' as const

const commit = () => {
  simpleGit().add('./bookmark.txt').commit('Update bookmark 🔖'), () => console.log('done')
}

;(async function () {
  if (process.argv[2]) {
    await fs.writeFile('bookmark.txt', process.argv[2])
    commit()
  } else {
    const current = await fs.readFile('bookmark.txt', { encoding: 'utf8' })

    const arrow = colors.green('➜  ')
    const book = colors.white('Index:    ')
    const bookmark = colors.cyan(`${BASE_BOOK}${current}`)

    console.log(`${arrow}${book}${colors.cyan(BASE_BOOK)}`)
    console.log(`${arrow}${colors.white('Bookmark: ')}${bookmark}`)
  }
})()
