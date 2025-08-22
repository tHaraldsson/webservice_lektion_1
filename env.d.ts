declare namespace NodeJS {
    interface ProcessEnv {
        MY_GLOBAL_TEST_SECRET: string | undefined
        PORT: number | undefined
    }
}