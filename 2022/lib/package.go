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

func PartOne() bool {
	part := flag.Int("part", 1, "part of the day to run")
	flag.Parse()
	return *part == 1
}

func FindMap[K comparable, V any](m map[K]V, criteria func(K, V) bool) (*K, *V, bool) {
	for key, value := range m {
		if criteria(key, value) {
			return &key, &value, true
		}
	}
	return nil, nil, false
}

func CommonKey[K comparable, V any](ms ...map[K]V) (K, bool) {
	m1 := ms[0]
	for k := range m1 {
		found := true
		for _, m2 := range ms[1:] {
			if _, ok := m2[k]; !ok {
				found = false
				break
			}
		}
		if found {
			return k, found
		}
	}

	var k K
	return k, false
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

func AtoiUnsafe(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		log.Panicf("Error parsing unsafely: %s", s)
	}
	return i
}
