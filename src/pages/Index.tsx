import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const services = [
    'Стрижка', 'Окрашивание', 'Маникюр', 'Педикюр', 'Макияж', 
    'Брови', 'Ресницы', 'Массаж', 'Косметология'
  ];

  const masters = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '/placeholder.svg',
      rating: 4.9,
      reviews: 127,
      services: ['Стрижка', 'Окрашивание'],
      price: '2500 ₽/час',
      location: 'Центр',
      available: true,
      experience: '5 лет'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      avatar: '/placeholder.svg',
      rating: 4.8,
      reviews: 89,
      services: ['Маникюр', 'Педикюр'],
      price: '1800 ₽/час',
      location: 'Север',
      available: true,
      experience: '3 года'
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      avatar: '/placeholder.svg',
      rating: 5.0,
      reviews: 156,
      services: ['Макияж', 'Брови'],
      price: '3000 ₽/час',
      location: 'Юг',
      available: false,
      experience: '7 лет'
    }
  ];

  const urgentRequests = [
    {
      id: 1,
      salon: 'Салон "Элегант"',
      service: 'Стрижка мужская',
      time: 'Сегодня 15:00-20:00',
      price: '2000 ₽',
      urgent: true
    },
    {
      id: 2,
      salon: 'Студия красоты "Лотос"',
      service: 'Маникюр',
      time: 'Завтра 10:00-14:00',
      price: '1500 ₽',
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-pink/10 via-white to-beauty-purple/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent">
                BeautyMatch
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Мастера</a>
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Салоны</a>
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Как работает</a>
              <Button variant="outline" className="border-beauty-pink text-beauty-pink hover:bg-beauty-pink hover:text-white">
                Вход
              </Button>
              <Button className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90">
                Регистрация
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent">
            Фриланс для бьюти-мастеров
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Находите клиентов мгновенно или срочно закрывайте смены в салоне. 
            Быстро, удобно, безопасно.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
            <Tabs defaultValue="find-master" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="find-master" className="text-base">Найти мастера</TabsTrigger>
                <TabsTrigger value="find-work" className="text-base">Найти работу</TabsTrigger>
              </TabsList>
              
              <TabsContent value="find-master" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Район города" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Центр</SelectItem>
                      <SelectItem value="north">Север</SelectItem>
                      <SelectItem value="south">Юг</SelectItem>
                      <SelectItem value="east">Восток</SelectItem>
                      <SelectItem value="west">Запад</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90 text-lg py-6">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="find-work" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input 
                    placeholder="Ваша специализация"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-6 text-lg"
                  />
                  <Select>
                    <SelectTrigger className="py-6">
                      <SelectValue placeholder="Когда готовы работать" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="tomorrow">Завтра</SelectItem>
                      <SelectItem value="week">На этой неделе</SelectItem>
                      <SelectItem value="flexible">Гибкий график</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90 text-lg py-6">
                    <Icon name="Briefcase" size={20} className="mr-2" />
                    Найти работу
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-pink mb-2">2,500+</div>
              <div className="text-gray-600">Активных мастеров</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-purple mb-2">850+</div>
              <div className="text-gray-600">Партнерских салонов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-light mb-2">15 мин</div>
              <div className="text-gray-600">Среднее время поиска</div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Requests Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Срочные запросы</h2>
            <div className="flex items-center text-red-500">
              <Icon name="Clock" size={20} className="mr-2" />
              <span className="font-medium">Обновлено 2 минуты назад</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentRequests.map(request => (
              <Card key={request.id} className={`hover:shadow-lg transition-shadow ${request.urgent ? 'border-red-300 bg-red-50/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{request.salon}</CardTitle>
                    {request.urgent && (
                      <Badge variant="destructive" className="animate-pulse">
                        <Icon name="AlertCircle" size={14} className="mr-1" />
                        СРОЧНО
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Icon name="Scissors" size={16} className="mr-2" />
                      <span>{request.service}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Icon name="Clock" size={16} className="mr-2" />
                      <span>{request.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <Icon name="DollarSign" size={16} className="mr-1" />
                        <span>{request.price}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className={request.urgent ? 
                          "bg-red-500 hover:bg-red-600" : 
                          "bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                        }
                      >
                        Откликнуться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Masters Catalog */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Популярные мастера</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masters.map(master => (
              <Card key={master.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={master.avatar} alt={master.name} />
                    <AvatarFallback className="bg-gradient-to-r from-beauty-pink to-beauty-purple text-white text-xl">
                      {master.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{master.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Icon name="Star" size={16} className="text-yellow-400 mr-1 fill-current" />
                      <span>{master.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{master.reviews} отзывов</span>
                    <span>•</span>
                    <span>{master.experience}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {master.services.map(service => (
                      <Badge key={service} variant="secondary" className="bg-gradient-to-r from-beauty-pink/10 to-beauty-purple/10 text-beauty-purple border-beauty-purple/20">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      <span>{master.location}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${master.available ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span>{master.available ? 'Доступен' : 'Занят'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-beauty-purple">{master.price}</span>
                    <Button 
                      className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                      disabled={!master.available}
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-beauty-pink/5 via-white to-beauty-purple/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Мгновенный поиск</h3>
                <p className="text-gray-600">Находите мастеров за 15 минут или получайте срочные заказы моментально</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Безопасные сделки</h3>
                <p className="text-gray-600">Проверенные профили, система рейтингов и безопасная оплата через платформу</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Рост доходов</h3>
                <p className="text-gray-600">Увеличьте заработок на 40% благодаря оптимальной загрузке и премиум-клиентам</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-beauty-pink to-beauty-purple">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Готовы начать зарабатывать больше?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам мастеров, которые уже увеличили свой доход с BeautyMatch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-beauty-purple hover:bg-gray-100 px-8 py-4 text-lg">
              <Icon name="User" size={20} className="mr-2" />
              Регистрация мастера
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-beauty-purple px-8 py-4 text-lg">
              <Icon name="Building" size={20} className="mr-2" />
              Регистрация салона
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">BeautyMatch</span>
              </div>
              <p className="text-gray-400">Фриланс-платформа для мастеров красоты и салонов</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Для мастеров</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Регистрация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поиск заказов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Портфолио</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Для салонов</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Найти мастера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Срочные заказы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Управление</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аналитика</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Условия</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BeautyMatch. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}