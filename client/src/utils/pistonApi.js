import axios from "axios"
import { COMPILER_BASEURL } from "../config/config.js";

export const executeCode = async (language, langVersion, sourceCode, input) => {
    const response = await axios.post(`${COMPILER_BASEURL}/execute`, {
        language: language,
        version: langVersion,
        files: [
            {
                content: sourceCode
            }
        ],
        stdin: input,
    })
    console.log(response.data)
    return response.data
}