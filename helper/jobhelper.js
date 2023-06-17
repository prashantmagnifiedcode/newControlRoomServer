const joi = require('@hapi/joi');

const JobSchema= joi.object({
	  name:joi.string().required(),
	  resume: joi.string().required(),
})

module.exports = {JobSchema}