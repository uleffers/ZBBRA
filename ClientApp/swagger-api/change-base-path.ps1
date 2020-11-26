Write-Host ">> Replace current BASE_PATH with server root :: STARTED"

$jsonFilePath = './api/base.ts';
$content = (Get-Content $jsonFilePath)

if ($content.Length -eq 0) {
    Write-Error "$jsonFilePath is empty. Can not replace BASE_PATH"
}

$regex = 'BASE_PATH = (.*?);';
$text_to_replace = [regex]::match($content, $regex)
if ($text_to_replace.Length -eq 0) {
    Write-Error "Can not find BASE_PATH with given regex: $regex"
}

$content.replace($text_to_replace, 'BASE_PATH = "";') | Set-Content $jsonFilePath;
Write-Host ">> Replace current BASE_PATH with server root :: FINISHED"
