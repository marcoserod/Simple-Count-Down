import { useEffect, useState } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import beep from "../assets/alarm.mp3"

export const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [laps, setLaps] = useState(0);
  let initialTime = minutes * 60 + seconds;
  const alarm = new Audio(beep);

  const confirmFinish = () => {
    alert('El tiempo ha terminado');
    alarm.pause()
    alarm.currentTime = 0;

}
  const onFinish = () => {
    setLaps((prev) => prev + 1);
    alarm.play().then(()=> confirmFinish())
    
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(null)
      onFinish()
    }
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    setTimeLeft(null);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleMinuteChange = (value) => {
    setMinutes(Number(value));
  };

  const handleSecondChange = (value) => {
    setSeconds(Number(value));
  };
   
  const renderTime = ({ remainingTime }) => {
    const remainingMinutes = Math.floor(remainingTime / 60); // Get the whole number of minutes
    const remainingSeconds = remainingTime % 60;
    return (
      <div className="timer">
        <div className="value">
          {" "}
          {remainingMinutes} : {remainingSeconds.toString().padStart(2, "0")}
        </div>
      </div>
    );
  };

  
  return (
    <ChakraProvider>
      <Box>
        <Stack spacing={4} direction="column">
          <Text fontSize="3xl" fontWeight="bold" mt={8}>
            Completaste {laps} serie{(laps > 1 || laps === 0) && `s`}
          </Text>
          {!isRunning ? (
            <Stack mt={4} spacing={4} direction="row">
              <FormControl>
                <FormLabel>Minutos</FormLabel>
                <NumberInput
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={handleMinuteChange}
                  size="md"
                  variant="outline"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Segundos</FormLabel>
                <NumberInput
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={handleSecondChange}
                  size="md"
                  variant="outline"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>
          ) : null}
          {!isRunning ? (
            <>
              <Button onClick={startTimer} colorScheme="green" isDisabled={!minutes && !seconds }>
                Empezar
              </Button>
              <Button onClick={resetTimer} colorScheme="red">
                Restablecer tiempo
              </Button>
              { laps > 0 ? <Button onClick={() => setLaps(0)} colorScheme="red">
                Restablecer series
              </Button> : null}
            </>
          ) : (
            isRunning && (
                <>
              <Box style={{display: "flex", justifyContent: "center"}}>
                <CountdownCircleTimer
                  isPlaying={isRunning}
                  duration={initialTime}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[
                      initialTime,
                      initialTime / 3,
                      initialTime / 4,
                      0,
                    ]}
                    >
                  {renderTime}
                </CountdownCircleTimer>
            </Box>
                <Button onClick={stopTimer} colorScheme="red">
                  Detener
                </Button>
              </>
            )
          )}
        </Stack>
      </Box>
    </ChakraProvider>
  );
};
