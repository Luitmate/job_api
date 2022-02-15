const getAllJobs = async (req, res) => {
    res.send('all1 jobs')
}

const getJob = async (req, res) => {
    res.send('all2 jobs')
}

const createJob = async (req, res) => {
    res.send('all jobs')
}

const updateJob = async (req, res) => {
    res.send('all jobs')
}

const deleteJob = async (req, res) => {
    res.send('all jobs')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}