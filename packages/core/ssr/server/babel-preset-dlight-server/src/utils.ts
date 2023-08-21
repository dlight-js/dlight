export function getRelativePath(targetFile: string) {
  const currentFolder = process.cwd()
  const currentFolderArr = currentFolder.split("/")
  const targetFileArr = targetFile.split("/")
  let i = 0
  while (currentFolderArr[i] === targetFileArr[i]) {
    i++
  }
  let relativePath = ""
  for (let j = i; j < currentFolderArr.length - 1; j++) {
    relativePath += "../"
  }
  for (let j = i; j < targetFileArr.length; j++) {
    relativePath += targetFileArr[j] + "/"
  }
  relativePath = relativePath.slice(0, -1)
  if (!relativePath.startsWith("..")) relativePath = "./" + relativePath

  return relativePath
}
