module.exports.validateTitle = async () => {

}

function validate(params) {
    if (params.length === 0) {
        throw new Error(`Enter a valid ${params.title}`)
    }
}