package main

import (
	"errors"
	"fmt"
	"github.com/alexsward/advent/lib"
	"log"
	"strings"
)

const (
	ROCK     Throw = 1
	PAPER    Throw = 2
	SCISSORS Throw = 3
)

type Throw int

type Strategy struct {
	Opponent, Defense Throw
}

func (s *Strategy) Win() bool {
	if s.Defense == ROCK && s.Opponent == SCISSORS {
		return true
	}
	if s.Defense == PAPER && s.Opponent == ROCK {
		return true
	}
	if s.Defense == SCISSORS && s.Opponent == PAPER {
		return true
	}
	return false
}

func (s *Strategy) Points() int {
	if s.Defense == s.Opponent {
		return int(s.Defense) + 3
	} else if s.Win() {
		return int(s.Defense) + 6
	} else {
		return int(s.Defense)
	}
}

func main() {
	input, scanner := lib.LoadInput("input")
	defer input.Close()

	right := mapThrow
	if !lib.PartOne() {
		right = mapOutcome
	}

	points := 0
	for scanner.Scan() {
		s := strings.Split(scanner.Text(), " ")
		offense := mapThrow(ROCK, s[0])
		strategy := &Strategy{
			Opponent: offense,
			Defense:  right(offense, s[1]),
		}
		pts := strategy.Points()
		points += pts
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("error scanning input: %s", err)
		return
	}
	log.Printf("Points: %d", points)
}

func mapThrow(offense Throw, throw string) Throw {
	switch throw {
	case "A", "X":
		return ROCK
	case "B", "Y":
		return PAPER
	case "C", "Z":
		return SCISSORS
	}
	panic(errors.New(fmt.Sprintf("Cannot parse throw: %s", throw)))
}

func mapOutcome(offense Throw, outcome string) Throw {
	switch outcome {
	case "X":
		switch offense {
		case ROCK:
			return SCISSORS
		case PAPER:
			return ROCK
		case SCISSORS:
			return PAPER
		}
	case "Y":
		return offense
	case "Z":
		switch offense {
		case ROCK:
			return PAPER
		case PAPER:
			return SCISSORS
		case SCISSORS:
			return ROCK
		}
	}
	panic(errors.New(fmt.Sprintf("Cannot parse outcome: %s", outcome)))
}
