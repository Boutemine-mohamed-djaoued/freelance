

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
    message
  }
}`

const freelancerFeed = `query GetFreelancerFeed($getFreelancerFeedId: ID!, $size: String, $structure: String, $rate: Float, $experience: String, $date: String, , $query: String) {
  getFreelancerFeed(id: $getFreelancerFeedId, size: $size, structure: $structure, rate: $rate, experience: $experience, date: $date , query: $query) {
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
const getClientJobs = `query ExampleQuery($clientDashId: ID!) {
  clientDash(id: $clientDashId) {
    moneySpent
    graph
    jobs {
      _id
      title
      requests
      price
      createdAt
    }
    rating {
      score
      stars
    }
    jobsArchive {
      _id
      title
      clientReview
      freelancerReview
      description
      attachments {
        kind
        link
      }
      tags
      price
      job_size
      payment_structure
      createdAt
      deadline
      details {
        _id
        bio
        firstName
        jobTitle
        lastName
        photo
      }
      expertize_level
      files {
        kind
        link
      }
    }
    jobsProgress {
      _id
      attachments {
        kind
        link
      }
      deadline
      description
      details {
        _id
        bio
        firstName
        jobTitle
        lastName
        photo
      }
      expertize_level
      job_size
      files {
        kind
        link
      }
      payment_structure
      tags
      price
      title
      createdAt
    }
  }
}
`
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
const clientReveiwFreelancer = `mutation ClientReviewFreelancer($reviewed: ID!, $score: Int!, $comment: String, $reviewer: ID, $work: ID) {
  clientReviewFreelancer(reviewed: $reviewed, score: $score, comment: $comment, reviewer: $reviewer, work: $work)
}`
const freelancerReveiwClient = `mutation FreelancerReviewClient($reviewed: ID!, $score: Int!, $comment: String, $reviewer: ID, $work: ID) {
  freelancerReviewClient(reviewed: $reviewed, score: $score, comment: $comment, reviewer: $reviewer, work: $work)
}`
const getTalents = `query Query($talentsId: ID!) {
  talents(id: $talentsId) {
    freelancers {
      _id
      description
      firstName
      jobTitle
      lastName
      photo
    }
    name
  }
}`
const getFreelancerDash = `query FreelancerDash($freelancerDashId: ID!) {
  freelancerDash(id: $freelancerDashId) {
    graph
    moneyMade
    jobsArchive {
      _id
      clientReview
      freelancerReview
      attachments {
        kind
        link
      }
      createdAt
      deadline
      description
      details {
        _id
        bio
        createdAt
        firstName
        jobTitle
        lastName
        photo
      }
      expertize_level
      files {
        kind
        link
      }
      job_size
      payment_structure
      tags
      price
      title
    }
    rating {
      score
      stars
    }
    jobsProgress {
      _id
      attachments {
        kind
        link
      }
      createdAt
      deadline
      description
      details {
        _id
        firstName
        lastName
        bio
        jobTitle
        photo
        createdAt
      }
      files {
        link
        kind
      }
      expertize_level
      job_size
      payment_structure
      price
      tags
      title
    }
    requests {
      attachments
      createdAt
      updatedAt
      deadline
      description
      _id
      price
      freelancer
      job {
        title
      }
    }
  }
}`
const getChargilyLink = `query GetChargilyLink($getChargilyLinkId: ID, $job: ID) {
  getChargilyLink(id: $getChargilyLinkId, job: $job) {
    message
    url
  }
}`
const freelancerUploadFiles = `mutation UploadFiles($uploadFilesId: ID, $jobid: ID, $files: [attachmentInput]) {
  uploadFiles(id: $uploadFilesId, jobid: $jobid, files: $files) {
    message
  }
}`
const createReport = `mutation CreateReport($type: ReportType!, $description: String!, $freelancerId: String!, $clientId: String!, $job: String) {
  createReport(type: $type, description: $description, freelancerId: $freelancerId, clientId: $clientId, job: $job)
}`
const addWeight = `mutation AddWeight($addWeightId: ID, $jobid: ID) {
  addWeight(id: $addWeightId, jobid: $jobid)
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
  validateJob,
  clientReveiwFreelancer,
  getTalents,
  getFreelancerDash,
  freelancerReveiwClient,
  getChargilyLink,
  freelancerUploadFiles,
  createReport,
  addWeight
};