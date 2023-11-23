import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const [diaryList, setDiaryList] = useState(null);
  useEffect(() => {
    fetchDiary();
  }, []);

  const fetchDiary = async () => {
    const res = await axios.get("http://localhost:4000/api/diary");
    setDiaryList(res.data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    const selectedMood = document.querySelector('input[name="mood"]:checked');

    if (!selectedMood) {
      alert("Please select a mood.");
      return;
    }

    axios.post("http://localhost:4000/api/diary", {
      title,
      content,
      mood: selectedMood.value,
    });

    fetchDiary();
  };

  return (
    <>
      <Container>
        <Title>일기를 써봅시다!</Title>
        <Form onSubmit={onSubmitHandler}>
          <Input name="title" placeholder="제목" />
          <TextArea name="content" placeholder="내용" />
          오늘의 기분을 선택해주세요.
          <MoodWrapper>
            <label>
              <MoodCheck type="radio" name="mood" value="신남" />
              신남
            </label>
            <label>
              <MoodCheck type="radio" name="mood" value="좋음" />
              좋음
            </label>
            <label>
              <MoodCheck type="radio" name="mood" value="보통" />
              보통
            </label>
            <label>
              <MoodCheck type="radio" name="mood" value="나쁨" />
              나쁨
            </label>
            <label>
              <MoodCheck type="radio" name="mood" value="화남" />
              화남
            </label>
          </MoodWrapper>
          <SubmitButton type="submit">추가</SubmitButton>
        </Form>

        {diaryList && (
          <DiaryList>
            {diaryList.map((diary) => (
              <DiaryItem key={diary.id}>
                <div>
                  <DiaryTitle>{diary.title}</DiaryTitle>
                  <DiaryContent>{diary.content}</DiaryContent>
                  <DiaryMood>오늘의 기분은 {diary.mood}</DiaryMood>
                </div>
              </DiaryItem>
            ))}
          </DiaryList>
        )}
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DiaryList = styled.ul`
  list-style: none;
  width: 60%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const DiaryItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DiaryMood = styled.h3`
  font-size: 15px;
  margin-bottom: 8px;
`;

const DiaryContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const MoodCheck = styled.input`
  font-size: 20px;
`;

const MoodWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;
