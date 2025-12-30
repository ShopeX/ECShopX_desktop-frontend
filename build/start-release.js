const exec = require('exec-sh').promise

async function checkUnstagedFiles() {
  const { stdout } = await exec('git status', true)
  if (stdout.includes('Changes not staged') || stdout.includes('Untracked files')) {
    console.info(stdout)
    return false
  }

  return true
}

async function main() {
  if (!(await checkUnstagedFiles())) {
    throw new Error('Working tree contains unstaged changes.')
  }

  const { stdout } = await exec('npx standard-version --dry-run', true)
  console.log(stdout)
  const matches = stdout.match(/bumping version in package.json from ([\d\.]+) to ([\d\.]+)/)
  const nextVersion = matches[2]
  const version = `v${nextVersion}`

  console.info(`nextVersion is ${version}`)
  await exec(`npx standard-version`)
  await exec(`git flow release start ${version}`)
  // await exec(`git flow release publish ${version}`)
}

main()
