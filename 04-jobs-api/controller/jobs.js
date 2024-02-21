const { StatusCodes } = require("http-status-codes");
const Job = require("../model/jobs");
const user = require("../model/user");

const getAllJobs = async (req, res) => {
  const createdBy = req.user.userId;
  try {
    const jobs = await Job.find({ createdBy }, "-updatedAt");

    if (!jobs.length) {
      res.status(StatusCodes.OK).json({
        status: 1,
        jobs: "No job availabe for this user",
      });
    }

    res.status(StatusCodes.OK).json({ status: 1, jobs, count: jobs.length });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ status: 0, msg: error });
  }
};

const getJob = async (req, res) => {
  const createdBy = req.user.userId;
  try {
    const jobs = await Job.findOne({ _id: req.params.id, createdBy });

    if (!jobs) {
      res.status(StatusCodes.OK).json({
        status: 1,
        jobs: "No job availabe",
      });
    }

    res.status(StatusCodes.OK).json({ status: 1, jobs });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ status: 0, msg: error });
  }
};

const createJob = async (req, res) => {
  const userId = req.user.userId;
  const { company, position } = req.body;

  const user = await Job.create({ createdBy: userId, company, position });

  res
    .status(StatusCodes.CREATED)
    .json({ status: 1, msg: "job created", data: user });
};

const updateJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  try {
    const job = await Job.updateOne(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ status: 1, msg: "updated successfully done", data: job });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteJob = async (req, res) => {
  const createdBy = req.user.userId;
  try {
    const jobs = await Job.deleteOne({ _id: req.params.id, createdBy });
    res.status(StatusCodes.OK).json({ status: 1, jobs });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ status: 0, msg: error });
  }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
