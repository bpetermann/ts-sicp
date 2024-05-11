import simpleGit from 'simple-git'
;(function () {
  if (!process.argv[2]) return
  simpleGit().add('./*').commit(`Add exercise ${process.argv[2]}`).push('origin', 'main'), () => console.log('done')
})()
