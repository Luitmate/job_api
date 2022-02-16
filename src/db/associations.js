const Job = require('../models/Job')
const User = require('../models/User')

// Job.hasOne(User)
// User.belongsTo(Job)

User.hasMany(Job, {
    foreignKey: 'created_by'
})
Job.belongsTo(User, {
    foreignKey: 'created_by'
})