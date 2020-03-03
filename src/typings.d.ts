declare var processLocal: Process;

interface Process {
    env: Env
}

interface Env {
    API_URL: string
}

interface GlobalEnvironment {
    processLocal: Process;
}