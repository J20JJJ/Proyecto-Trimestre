import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import whosthatPokemon from "@/components/elementos/whosthatPokemon.vue"

describe('whosthatPokemon.vue', () => {
  const mountComponent = () => mount(whosthatPokemon)

  it('se monta y muestra la pantalla de introducción', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.poke-section').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain('What type of trainer are you?')
  })

  it('startGame(151) activa modo classic y juego', () => {
    const wrapper = mountComponent()
    wrapper.vm.startGame(151)
    
    expect(wrapper.vm.classic).toBe(true)
    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.vm.score).toBe(0)
  })

  it('startGame(0) activa modo master y juego', () => {
    const wrapper = mountComponent()
    wrapper.vm.startGame(0)
    
    expect(wrapper.vm.classic).toBe(false)
    expect(wrapper.vm.isPlaying).toBe(true)
  })

  it('trainerHover cambia el entrenador hovereado', () => {
    const wrapper = mountComponent()
    wrapper.vm.trainerHover('classic')
    expect(wrapper.vm.trainerHovered).toBe('classic')
    
    wrapper.vm.trainerHover(null)
    expect(wrapper.vm.trainerHovered).toBe(null)
  })

  it('checkAnswer correcta incrementa score y cambia bgColor a verde', () => {
    const wrapper = mountComponent()
    wrapper.vm.isPlaying = true
    wrapper.vm.currentQuestion = {
      correctAnswer: 'pikachu',
      options: [{ name: 'pikachu' }]
    }
    
    wrapper.vm.checkAnswer({ name: 'pikachu' })
    
    expect(wrapper.vm.score).toBe(1)
    expect(wrapper.vm.bgColor).toBe('#1db12a')
  })

  it('checkAnswer incorrecta cambia bgColor a rojo', () => {
    const wrapper = mountComponent()
    wrapper.vm.isPlaying = true
    wrapper.vm.currentQuestion = { correctAnswer: 'pikachu' }
    
    wrapper.vm.checkAnswer({ name: 'charmander' })
    
    expect(wrapper.vm.bgColor).toBe('#cf0000')
    expect(wrapper.vm.score).toBe(0)
  })

  it('restartGame resetea el estado del juego', () => {
    const wrapper = mountComponent()
    wrapper.vm.isDone = true
    wrapper.vm.isPlaying = true
    wrapper.vm.classic = true
    
    wrapper.vm.restartGame()
    
    expect(wrapper.vm.isDone).toBe(false)
    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.classic).toBe(false)
  })

  it('botones Classic y Master existen en pantalla inicial', () => {
    const wrapper = mountComponent()
    const classicBtn = wrapper.findAll('.button11').find(btn => btn.text().includes('Classic'))
    const masterBtn = wrapper.findAll('.button11').find(btn => btn.text().includes('Master'))
    
    expect(classicBtn.exists()).toBe(true)
    expect(masterBtn.exists()).toBe(true)
  })
})
