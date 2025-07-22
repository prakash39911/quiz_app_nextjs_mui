import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Refresh,
  EmojiEvents,
  GpsFixed,
  Timer,
} from "@mui/icons-material";
import { getDifficultyColor } from "@/lib/UtilityFunctions";
import { SavedAnswer, storeQuestionType } from "@/types";
import { KatexRender } from "./QuestionAnswers";

interface QuizResultsProps {
  currentQuestionsArray: storeQuestionType[];
  savedAnswerArray: SavedAnswer[];
  onReset: () => void;
}

const QuizResult = ({
  currentQuestionsArray,
  savedAnswerArray,
  onReset,
}: QuizResultsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const totalQuestions = currentQuestionsArray.length;
  const totalMarks = currentQuestionsArray.reduce(
    (sum, q) => sum + q.marksAllocated,
    0
  );
  const totalTimeTaken = savedAnswerArray.reduce(
    (sum, a) => sum + a.timeTaken,
    0
  );

  let correctAnswers = 0;
  let earnedMarks = 0;

  savedAnswerArray.forEach((answer) => {
    const question = currentQuestionsArray.find((q) => q.id === answer.id);
    if (question && answer.givenAnswer === answer.correctAnswer) {
      correctAnswers++;
      earnedMarks += question.marksAllocated;
    }
  });

  const percentageScore =
    totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

  const getScoreColor = () => {
    if (percentageScore >= 80) return theme.palette.success.main;
    if (percentageScore >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header Section */}
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <EmojiEvents
              sx={{ fontSize: { xs: 48, md: 64 }, color: "primary.main" }}
            />
          </Box>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Quiz Results
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Here&apos;s how you performed!
          </Typography>
        </Box>

        {/* Score Summary Card */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Box textAlign="center" sx={{ mb: 3 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                sx={{ mb: 2 }}
              >
                <GpsFixed color="primary" />
                <Typography variant="h4" component="h2" fontWeight="bold">
                  Final Score
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                component="div"
                fontWeight="bold"
                sx={{
                  color: getScoreColor(),
                  fontSize: { xs: "3rem", md: "5rem" },
                }}
              >
                {percentageScore}%
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {earnedMarks} out of {totalMarks} marks
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              textAlign="center"
              sx={{ mb: 4, flexWrap: "wrap", gap: 2 }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {correctAnswers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Correct
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="error.main">
                  {totalQuestions - correctAnswers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Incorrect
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {totalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Questions
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="secondary.main"
                >
                  {formatTime(totalTimeTaken)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Time
                </Typography>
              </Box>
            </Box>

            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                size="large"
                onClick={onReset}
                startIcon={<Refresh />}
                sx={{ px: 4, py: 1.5 }}
              >
                Start New Quiz
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Question by Question Breakdown */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Question Breakdown
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {currentQuestionsArray.map((question, index) => {
              const userAnswer = savedAnswerArray.find(
                (a) => a.id === question.id
              );
              const isCorrect =
                userAnswer?.givenAnswer === userAnswer?.correctAnswer;

              return (
                <Card key={question.id} elevation={2}>
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {/* Question Header */}
                    <Box
                      display="flex"
                      flexDirection={isMobile ? "column" : "row"}
                      alignItems={isMobile ? "flex-start" : "center"}
                      justifyContent="space-between"
                      gap={2}
                      sx={{ mb: 2 }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        flexWrap="wrap"
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Chip
                          label={question.difficultyLevel}
                          color={
                            getDifficultyColor(question.difficultyLevel) as
                              | "default"
                              | "success"
                              | "warning"
                              | "error"
                          }
                          variant="outlined"
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {question.marksAllocated}{" "}
                          {question.marksAllocated === 1 ? "mark" : "marks"}
                        </Typography>
                        {userAnswer && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <Timer fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {userAnswer.timeTaken}s
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        {isCorrect ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color={isCorrect ? "success.main" : "error.main"}
                        >
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Question Text */}
                    <Typography
                      variant="body1"
                      fontWeight="medium"
                      sx={{ mb: 3 }}
                    >
                      <KatexRender text={question.question} />
                    </Typography>

                    {/* Answer Comparison */}
                    <Box
                      display="grid"
                      gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
                      gap={2}
                    >
                      {/* User's Answer */}
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Your Answer:
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            backgroundColor: isCorrect
                              ? "success.50"
                              : "error.50",
                            border: `1px solid`,
                            borderColor: isCorrect
                              ? "success.200"
                              : "error.200",
                            color: isCorrect ? "success.800" : "error.800",
                          }}
                        >
                          {userAnswer?.givenAnswer || "Not answered"}
                        </Paper>
                      </Box>

                      {/* Correct Answer */}
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Correct Answer:
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            backgroundColor: "success.50",
                            border: `1px solid`,
                            borderColor: "success.200",
                            color: "success.800",
                          }}
                        >
                          {question.correctOption}
                        </Paper>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Footer */}
        <Box textAlign="center" sx={{ pt: 4, pb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Great job completing the quiz! Keep practicing to improve your
            score.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default QuizResult;
