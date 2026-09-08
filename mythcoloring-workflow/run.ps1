# Works with the bundled Codex runtime on this machine, or a user-selected Python.
$ErrorActionPreference = 'Stop'
$PythonPath = $env:MYTHCOLORING_PYTHON
if (-not $PythonPath) {
    $bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
    if (Test-Path -LiteralPath $bundledPython) { $PythonPath = $bundledPython }
    else { $PythonPath = 'python' }
}
Push-Location $PSScriptRoot
try {
    & $PythonPath (Join-Path $PSScriptRoot 'make_product.py') @args
    $result = $LASTEXITCODE
} finally { Pop-Location }
exit $result
