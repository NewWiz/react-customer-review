import Card from './shared/Card'
import { useState, useContext, useEffect } from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setComment(feedbackEdit.item.comment)
      setName(feedbackEdit.item.name)
      setRating(feedbackEdit.item.rating)
      const current = new Date()
      setDate(
        `${
          current.getMonth() + 1
        }/${current.getDate()}/${current.getFullYear()}`
      )
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    const comment = document.getElementById('inputComment').value
    const name = document.getElementById('inputName').value
    if (comment === '' || name === '') {
      setBtnDisabled(true)
    } else if (name !== '' && name.trim().length <= 2) {
      setMessage('Please enter a name.')
      setBtnDisabled(true)
    } else if (comment !== '' && comment.trim().length <= 10) {
      setMessage('Comment must be at least 10 characters.')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setComment(comment)
    setName(name)
    const current = new Date()
    setDate(
      `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim().length >= 10 && name.trim().length >= 3) {
      const newFeedback = {
        name,
        comment,
        rating,
        date,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setComment('')
      setName('')
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <div className="input-name">
            <input
              id="inputName"
              onChange={handleTextChange}
              type="text"
              placeholder="Enter your name"
              value={name}
            />
          </div>
          <div className="input-text-and-button">
            <input
              id="inputComment"
              onChange={handleTextChange}
              type="text"
              placeholder="Write a review"
              value={comment}
            />
            <Button type="submit" isDisabled={btnDisabled}>
              Send
            </Button>
          </div>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
