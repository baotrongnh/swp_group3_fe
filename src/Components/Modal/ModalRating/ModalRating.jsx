import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Flex, Modal, Rate } from "antd"
import TextArea from "antd/es/input/TextArea"
import PropTypes from "prop-types"
import { useContext, useState } from "react"
import { ratingMentor } from "../../../apis/mentor"
import { AuthContext } from "../../../Contexts/AuthContext"

function ModalRatingMentor({ mentorId, modalOpen, setModalOpen }) {
     const queryClient = useQueryClient()
     const { currentUser } = useContext(AuthContext)
     const [feedback, setFeedback] = useState({ studentId: currentUser?.accountId, mentorId, rating: '', text: '' })
     const mutation = useMutation({
          mutationFn: () => ratingMentor(feedback),
          onSuccess: () => {
               queryClient.invalidateQueries([`rating-list-${mentorId}`])
          },
          onError: (error) => {
               console.log(error)
          }
     });

     const handleOk = () => {
          if (feedback.rating == '') {
               console.log('isValidate?')
          } else {
               mutation.mutateAsync()
               setModalOpen(false)
          }
     }

     const onChangeFeedback = (e) => {
          setFeedback({ ...feedback, text: e.target.value })
     }

     const onChangeRating = (value) => {
          setFeedback({ ...feedback, rating: value })
     }

     return (
          <div className="modal-rating">
               <Modal
                    title="Rating for mentor"
                    centered
                    okText='Send'
                    open={modalOpen}
                    onOk={handleOk}
                    onCancel={() => setModalOpen(false)}
                    confirmLoading={mutation.isPending}
                    okButtonProps={{ disabled: feedback.rating == '' }}
               >
                    <Flex vertical align="center" className="rating-block">
                         <Rate style={{ padding: '20px', fontSize: '3rem' }} allowClear onChange={onChangeRating} />

                         <TextArea
                              showCount
                              maxLength={100}
                              onChange={onChangeFeedback}
                              placeholder="Feedback for mentor...."
                              style={{
                                   height: 120,
                                   resize: 'none',
                                   marginBottom: '30px'
                              }}
                         />
                    </Flex>
               </Modal>
          </div>
     )
}

export default ModalRatingMentor

ModalRatingMentor.propTypes = {
     studentId: PropTypes.any,
     mentorId: PropTypes.any,
     modalOpen: PropTypes.any,
     setModalOpen: PropTypes.any
}