

const loginQuery = `mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
        role
        firstName
        lastName
        photo
      }
    }
  }`

const createFreelancerQuery = `mutation CreateFreelancer($input: Input!, $skills: [String]) {
  createFreelancer(input: $input, skills: $skills) {
    id
    firstName
    email
    lastName
    role
    photo
    jobTitle
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

const createClientQuery = `mutation CreateClient($input: Input!, $interests: [String]) {
  createClient(input: $input, interests: $interests) {
    id
    firstName
    photo
    role
    lastName
  }
}`;

const FreelancerProfileQuery = `query FreelancerProfile($freelancerProfileId: ID) {
  freelancerProfile(id: $freelancerProfileId) {
    comments {
      client {
        email
        firstName
        id
        lastName
        jobTitle
        photo
      }
      comment
      job
      score
      createdAt
    }
    freelancer {
      bio
      ccp
      createdAt
      dateOfBirth
      description
      email
      firstName
      id
      jobTitle
      lastName
      moneyMade
      phoneNumber
      photo
      role
      skills
      willaya
    }
  }
}`;

const ClientProfileQuery = `query ClientProfile($clientProfileId: ID) {
  clientProfile(id: $clientProfileId) {
    client {
      bio
      ccp
      dateOfBirth
      createdAt
      description
      email
      firstName
      id
      interests
      jobTitle
      lastName
      phoneNumber
      moneySpent
      photo
      role
      willaya
    }
    comments {
      comment
      createdAt
      freelancer {
        firstName
        id
        lastName
        jobTitle
        email
        photo
      }
      job
      score
    }
  }
}`

const FreelancerResetPasswordQuery = `mutation ResetFreelancerPassword($newpass: String!, $resetFreelancerPasswordId: String, $oldpass: String!) {
  resetFreelancerPassword(newpass: $newpass, id: $resetFreelancerPasswordId, oldpass: $oldpass)
}`;

const UpdateFreelancerCCP = `mutation UpdateFreelancer($input: update, $updateFreelancerId: ID) {
  updateFreelancer(input: $input, id: $updateFreelancerId) {
    message
  }
}`

const UpdateFreelancerBirthday = `mutation UpdateFreelancer($input: update, $updateFreelancerId: ID) {
  updateFreelancer(input: $input, id: $updateFreelancerId) {
    message
  }
}`

const UpdateFreelancerHead = `mutation UpdateFreelancer($input: update, $updateFreelancerId: ID) {
  updateFreelancer(input: $input, id: $updateFreelancerId) {
    message
  }
}`

const forgetPassword = `query Query($email: String) {
  forgotPassword(email: $email)
}`

const verifyResetToken =`query Query($pass: String, $token: String, $verifyResetTokenId: ID) {
  verifyResetToken(pass: $pass, token: $token, id: $verifyResetTokenId)
}`

const updateClientBirthday = `mutation UpdateClient($updateClientId: ID, $input: update) {
  updateClient(id: $updateClientId, input: $input) {
    message
  }
}`

const updateClientCCP = `mutation UpdateClient($updateClientId: ID, $input: update) {
  updateClient(id: $updateClientId, input: $input) {
    message
  }
}`

const updateClientHead = `mutation UpdateClient($updateClientId: ID, $input: update) {
  updateClient(id: $updateClientId, input: $input) {
    message
  }
}`

export {
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
  addWeight,
  loginQuery,
  createFreelancerQuery,
  FreelancerProfileQuery,
  createClientQuery,
  FreelancerResetPasswordQuery,
  UpdateFreelancerCCP,
  forgetPassword,
  verifyResetToken,
  ClientProfileQuery,
  updateClientBirthday,
  updateClientCCP,
  updateClientHead,
  UpdateFreelancerBirthday,
  UpdateFreelancerHead,
};