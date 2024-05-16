

const loginQuery = `mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }`

const createFreelancerQuery = `mutation CreateFreelancer($input: Input!) {
  createFreelancer(input: $input) {
    token
  }
}`
const postJob = `mutation PostJob($input: jobInput!, $user: ID!) {
  postJob(input: $input, user: $user) {
    title
    deadline
  }
}`

const freelancerFeed = `query GetFreelancerFeed($getFreelancerFeedId: ID!, $size: String, $structure: String, $rate: Float, $experience: String, $date: String) {
  getFreelancerFeed(id: $getFreelancerFeedId, size: $size, structure: $structure, rate: $rate, experience: $experience, date: $date) {
    _id
    title
    description
    deadline
    job_size
    expertize_level
    payment_structure
    attachments {
        kind
        link
    }
    tags
    createdAt
    clientInfo {
      _id
      firstName
      lastName
      jobTitle
      bio
      photo
    }
    reviewScore
    price
    jobsArchiveLength
    requestsLength
  }
}`
const postProposal = `mutation PostJobRequest($input: postJobRequestInput!, $userid: ID!) {
  postJobRequest(input: $input, userid: $userid) {
    message
  }
}
`
const getJobRequests = `query GetJobRequests($getJobRequestsId: ID!, $userid: ID!) {
  getJobRequests(id: $getJobRequestsId, userid: $userid) {
    job
    requests {
      firstName
      _id
      createdAt
      sum
      attachments {
        link
        kind
      }
      bio
      deadline
      lastName
      photo
      price
      score
      description
    }
  }
}`
const getClientJobs = `query ClientJobs($clientJobsId: ID!) {
  clientJobs(id: $clientJobsId) {
    jobs {
      title
      requests
      price
      createdAt
      _id
    }
    jobsArchive {
      _id
      title
      description
      attachments {
        kind
        link
      }
      tags
      price
      job_size
      payment_structure
      expertize_level
      deadline
      createdAt
      freelancerDetails {
        firstName
        lastName
        bio
        jobTitle
        photo
      }
    }
    jobsProgress {
      _id
      title
      description
      attachments {
        kind
        link
      }
      tags
      price
      job_size
      payment_structure
      expertize_level
      deadline
      createdAt
      freelancerDetails {
        bio
        firstName
        jobTitle
        lastName
        photo
      }
    }
    rating {
      score
      stars
    }
    graph
  }
}`
const acceptJob = `mutation AcceptJob($job: ID!, $client: ID!, $freelancer: ID!) {
  acceptJob(job: $job, client: $client, freelancer: $freelancer) {
    message
  }
}`
const validateJob = `mutation ValidateJob($job: ID!, $client: ID!) {
  validateJob(job: $job, client: $client) {
    message
  }
}`
export {
  loginQuery,
  createFreelancerQuery,
  postJob,
  freelancerFeed,
  postProposal,
  getJobRequests,
  getClientJobs,
  acceptJob,
  validateJob
};