const Video = require('../../models/video.js')
const User = require('../../models/user.js')

exports.countStreamsAndUpdateWatchHistory = (req, res, incNumber) => {
  const user = req.auth
  const plan = user.subscription_plan
  const video = req.video

  if (user.stream_count < plan.concurrent_streams) {
    User.updateOne(
      { _id: user._id },
      {
        $inc: { stream_count: incNumber },
        $addToSet: { watch_history: { _id: video._id } },
      }
    ).exec((err, data) => {
      if (err) {
        process.env.NODE_ENV !== 'production' && console.error(err)
      }
    })
  } else {
    res.status(403)
    res.json({
      message: `Your plan doesn't support more than ${plan.concurrent_streams} streams. Please close one stream to continue watching`,
    })
  }
}

exports.AddToWatchHistory = (req) => {
  const user = req.auth
  const plan = user.subscription_plan
  const video = req.video
  User.updateOne(
    { _id: user._id },
    {
      $addToSet: { watch_history: { _id: video._id } },
    }
  ).exec((err, data) => {
    if (err) {
      process.env.NODE_ENV !== 'production' && console.error(err)
    }
  })
}
