package lib

import (
	"bufio"
	"flag"
	"log"
	"os"
	"strconv"
)

func LoadInput(file string) (*os.File, *bufio.Scanner) {
	f, err := os.Open(file)
	if err != nil {
		log.Panicf("can't load input file %s: %s", file, err)
	}
	return f, bufio.NewScanner(f)
}

func RunDays(one, two func()) {
	if PartOne() {
		one()
		return
	}
	two()
}

func PartOne() bool {
	part := flag.Int("part", 1, "part of the day to run")
	flag.Parse()
	return *part == 1
}

func LinesInto[T any](scanner *bufio.Scanner, into func(string) (T, error)) ([]T, error) {
	things := make([]T, 0)
	for scanner.Scan() {
		thing, err := into(scanner.Text())
		if err != nil {
			return nil, err
		}
		things = append(things, thing)
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return things, nil
}

func LinesIntoSkip[T any](scanner *bufio.Scanner, into func(string) (T, bool, error)) ([]T, error) {
	things := make([]T, 0)
	for scanner.Scan() {
		thing, keep, err := into(scanner.Text())
		if err != nil {
			return nil, err
		}
		if keep {
			things = append(things, thing)
		}
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return things, nil
}

func ProcessLines(scanner *bufio.Scanner, process func(string) error) error {
	for scanner.Scan() {
		if err := process(scanner.Text()); err != nil {
			return err
		}
	}
	return nil
}

func Map[T, V any](things []T, transform func(T) V) []V {
	vs := make([]V, 0)
	for _, thing := range things {
		vs = append(vs, transform(thing))
	}
	return vs
}

func AtoiUnsafe(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		log.Panicf("Error parsing unsafely: %s", s)
	}
	return i
}
