package main

import (
	"fmt"
	"github.com/alexsward/advent/lib"
	"log"
	"strconv"
	"strings"
)

const (
	UP Direction = iota
	DOWN
	FORWARD
	BACKWARD
)

type Direction int

func NewDirection(raw string) Direction {
	switch strings.ToLower(raw) {
	case "up":
		return UP
	case "down":
		return DOWN
	case "forward":
		return FORWARD
	case "backward":
		return BACKWARD
	}
	panic(fmt.Sprintf("unknown direction: %s", raw))
}

type Instruction struct {
	Dir    Direction
	Amount int
}

func main() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()
	instructions, err := lib.LinesInto(scanner, func(s string) (*Instruction, error) {
		parts := strings.Split(s, " ")
		amt, err := strconv.Atoi(parts[1])
		if err != nil {
			return nil, err
		}
		return &Instruction{
			Dir:    NewDirection(parts[0]),
			Amount: amt,
		}, nil
	})
	if err != nil {
		log.Fatalf("error processing input: %s", err)
		return
	}

	if lib.PartOne() {
		depth, horizontal := 0, 0
		for _, instruction := range instructions {
			if instruction.Dir == UP {
				depth -= instruction.Amount
			} else if instruction.Dir == DOWN {
				depth += instruction.Amount
			} else {
				horizontal += instruction.Amount
			}
			//log.Printf("instruction: %+v, depth: %d horizontal: %d", instruction, depth, horizontal)
		}
		log.Printf("Positioning multiple: %d", depth*horizontal)
		return
	}

	depth, horizontal, aim := 0, 0, 0
	for _, instruction := range instructions {
		if instruction.Dir == UP {
			aim -= instruction.Amount
		} else if instruction.Dir == DOWN {
			aim += instruction.Amount
		} else {
			horizontal += instruction.Amount
			depth += aim * int(instruction.Amount)
		}
	}
	log.Printf("Positioning multiple: %d", depth*horizontal)
}
